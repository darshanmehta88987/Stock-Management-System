var sale=require('../models/sales_model');
var express=require('express');
var db=require('../dbconnec'); //reference of dbconnection.js

var router=express.Router();
router.get('/',function(req,res,next){
 
    sale.GetAllSale(function(err,rows){
     
    if(err)
      {
      res.json(err);
      }
      else
      {
      res.json(rows);
      }
    
    });
});
router.get('/:saleId',function(req, res, next) {
  sale.GetAllSaleById(req.params.saleId,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post('/',function(req,res,next){
    sale.addSale(req.body,function(err,rows){
      
      if(err)
      {
        console.log(err);
      }
      else
      {
        console.log(rows);
        res.json(rows);
      //  console.log("id is"+" "+rows.insertId);
        // sale.getId(req.body,function(err1,rows1){
        //   if(err1)
        //   {
        //     res.json(err1);
        //   }
        //   else
        //   {
        //     res.json(rows1);
        //   }
        // })

      
      }
      
     //console.log("id is"+" "+rows.insertId);
    }
    
  );

  }


);
  

 
  router.put('/:id?',function(req,res,next){
   sale.updateSale(req.params.id,req.body,function(err,rows){
            if(err)
            {
            res.json(err);
            }
            else
            {
            res.json(rows);
            }
    });
   });
   router.delete('/:id', function(req, res, next) {
    console.log("Inside 1");
    db.query("select * from sale where saleId=?",[req.params.id],function (err, result, fields) {
      console.log("Inside 2");
        if(result){
          console.log("Inside 3");
          console.log(req.params.id);
          db.query("select * from salesdetails where fkSaleId = ?",[req.params.id],function(err1,result1,fields1){
            if(result1){
              console.log("Inside 4");
              console.log(result1.length);
              let myBranch=result[0].fkBranchId;
              let stockUsage=[];
              let promise = new Promise((resolve,reject)=>{
                let i=0;
                console.log(result1.length);
                  for(i=0;i<result1.length;i++){
                    console.log("Adding Stock= "+parseInt(result1[i].saleQuantity));
                    stockUsage.push({
                      itemId:result1[i].fkItemId,
                      branchId:myBranch,
                      stock:parseInt(result1[i].saleQuantity)
                    });  
                  }
                  if(i==result1.length){
                    console.log("Inside 5");
                    resolve('Done');
                  }
              });
              promise.then((resolve)=>{
                if(resolve=='Done'){
                  console.log("Inside 6");
                  db.query("select * from stock where fkBranchId = ?",myBranch,function(err2,result2,fields2){
                    if(result2){
                      console.log("Inside 7");
                      let promise2 = new Promise((resolve2,reject2)=>{
                        console.log("Inside 8");
                        let j=0;
                        for(j=0;j<result2.length;j++){
                          for(let z=0;z<stockUsage.length;z++){
                              if(result2[j].fkItemId==stockUsage[z].itemId){
                                stockUsage[z].stock=parseInt(result2[j].stockQuantity) + parseInt(stockUsage[z].stock); 
                                console.log("Stock 1 ="+parseInt(stockUsage[z].stock)+"   "+parseInt(result2[j].stockQuantity));
                              }
                              // console.log("Stock 2 ="+stockUsage[z].stock)
                          }
                        }
                        if(j==result2.length){
                          console.log("Inside 9");
                          resolve2('Done');
                        }

                      }); 
                      promise2.then((resolve2)=>{
                        console.log("Inside 10");
                        if(resolve2=='Done'){
                          console.log("Inside 11");
                            let uptStr='CASE fkItemId';
                            let itemIDs=[];
                            let promise3 = new Promise((resolve3,reject3)=>{
                              console.log("Inside 12");
                            let p=0;
                            console.log(stockUsage.length);
                            for(p=0;p<stockUsage.length;p++){
                              let myStr=" WHEN '"+stockUsage[p].itemId+"' THEN "+parseInt(stockUsage[p].stock);
                              uptStr+=myStr;
                              console.log(uptStr);
                              itemIDs.push(stockUsage[p].itemId);
                            }
                            if(p==stockUsage.length){
                              uptStr+=' END';
                              console.log("Inside 13");
                              console.log(uptStr);
                              resolve3('Done');
                            }
                          });
                          promise3.then((resolve3)=>{
                              if(resolve3=='Done'){
                                console.log("Inside 14 "+itemIDs);
                                db.query( "update stock set stockQuantity = "+uptStr+" where fkItemId in (?) and fkBranchId = ? ",[itemIDs,myBranch], function(err3, rows3, fields3) {
                                  if(rows3){

                                    console.log("Inside 15");
                                    sale.deleteSale(req.params.id, function(err, rows) {
                                      if (err) {
                                        res.json(err);
                                      } else {
                                        res.json(rows);
                                      }
                                    });
                                    console.log("Final Done");
                                  }
                                });
                              }
                          });

                        }              
              });
            }  
          });
        }
        });
      }
    });  
    }
    });
  });
  router.post('/deleteMultiple', function(req, res, next) {
            db.query("delete from Sale where saleId in (?)",[req.body],function(err1,rows){
              if (err1) {
                res.json(err1);
              } else {
                res.json(rows);
              }
            });  
    
  });

  router.post('/cashTally', function(req, res, next) {
    db.query("select * from Sale where fkBranchId = (?)",[req.body.branchId],function(err,result,fields){
      if (err) {
        res.json(err);
      } else {
        // console.log("All Sales"+result[0].data);
        let stockUsage=req.body.stockUsage;
        
        let itemIds=[];
        let promise = new Promise((resolve,reject)=>{    

          let i=0;
              for(i=0;i<stockUsage.length;i++){
                console.log("Stock= "+stockUsage[i].fkItemId+" "+stockUsage[i].stockQuantity);
                itemIds.push(stockUsage[i].fkItemId);
              }
              if(i==stockUsage.length){
                console.log("Called 1");
                  resolve('Done');
              }
        });
                              promise.then((resolve)=>{
                                console.log("Called 2");
                             if(resolve=='Done'){
                              console.log("Called 3");
                              let promise2 = new Promise((resolve2,reject2)=>{ 
                                db.query("select * from item where itemId in (?)",[itemIds],function(err11,result11,fields11){
                                      resolve2(result11);
                                 });
                              });
                              promise2.then((resolve2)=>{
                                if(resolve2){
                                  
                                  console.log("called 4");
                                  
                                  if(resolve2.length>0){
                                    let promise3 = new Promise((resolve3,reject3)=>{
                                      console.log("called 5");
                                      let x=0;
                                      let totalPrice=0;
                                      for(x=0;x<stockUsage.length;x++){
                                        for(let y=0;y<stockUsage.length;y++){
                                          if(resolve2[x].itemId==stockUsage[y].fkItemId){
                                            totalPrice+=resolve2[x].minimumRate * stockUsage[y].stockQuantity;
                                            break;  
                                          }
                                        }
                                        console.log("called 6");
                                        
                                      }
                                      if(x==stockUsage.length){
                                        resolve3(totalPrice);
                                      }
                                     });
                                     promise3.then((resolve3)=>{
                                       if(resolve3){
                                        let creditSale=[];
                                        let cashSale=[];
                                        let creditCount=0;
                                        let cashCount=0;
                                        if(result.length>0){
                                        let promise4 = new Promise((resolve4,reject4)=>{
                                          let p=0;
                                          for(p=0;p<result.length;p++){
                                            let date=new Date();
                                            let currDate=new Date(result[p].salesDate);
                                            date.setHours(0,0,0,0)
                                            currDate.setHours(0,0,0,0)
                                            console.log("Inside sale id="+result[p].saleId);
                                            // console.log("Date ="+date);
                                            // console.log("Date ="+currDate);
                                            if(!(currDate > date) && !(currDate < date)){
                                              // console.log("Inside Date.sale Date="+result[i].salesDate);
                                              // if(result[i].fkSaleTypeId=='0040a784-6b5d-11ea-a8c8-ace2d3e54b8b'){
                                                // console.log("Inside CreditSale.");
                                                creditSale.push(result[p].saleId);
                                              // }
                                              // else{
                                              //   // console.log("Inside CashSale.");
                                              //     cashSale.push(result[i].saleId);
                                              // }
                                            }
                                          }
                                          console.log("Inside my");
                                          if(p==result.length){
                                            console.log("Inside my2");
                                            resolve4('Done');
                                          }
                                        });
                                        promise4.then((resolve4)=>{
                                          console.log("Inside my3");
                                            if(resolve4=='Done'){
                                              console.log("Inside my 4");
                                              let promise5 = new Promise((resolve5,reject5)=>{
                                                console.log("Inside my 5");
                                                  db.query("select * from salesdetails as s join item as i on (s.fkItemId=i.itemId) where s.fkSaleId in (?)",[creditSale],function(err1,result1,fields1){
                                                    console.log("Inside my 6");
                                                    if(result1){
                                                      console.log("Inside my 7");
                                                  let j=0;
                                                  let newVar=0;
                                                  for(j=0;j<result1.length;j++){
                                                    creditCount+=result1[j].saleQuantity*result1[j].minimumRate;
                                                    console.log("Inside CreditCount for sale id= "+result1[j].fkSaleId+" with qty= "+creditCount);
                                                  }
                                                  if(j==result1.length){
                                                    resolve5('Done');
                                                  }

                                                }
                                                else{
                                                  resolve5('Done');
                                                }
                                                });
                                            });
                                            promise5.then((resolve5)=>{
                                              if(resolve5=='Done'){
                                                console.log("Total Sale "+ creditCount);
                                              let final= resolve3  - creditCount ; 
                                              console.log("Final Amt  "+ final);
                                              db.query("update branch set cash= ? where branchId= ?",[final,req.body.branchId],function(err3,result3){
                                                  res.send("Done = "+final);
                                              });
                                            }
                                            });
                                            }
                                        });
                                      }
  
                                          // db.query("select * from salesdetails as s join item as i on (s.fkItemId=i.itemId) where s.fkSaleId in (?)",[cashSale],function(err2,result2,fields2){
                                          //   // console.log("Calculate Cash Sale");
                                          //   if(result2.length>0){
                                          //     for(let j=0;j<result2.length;j++){ 
                                          //       cashCount+=result2[j].saleQuantity*result2[j].minimumRate;
                                          //       console.log("Inside CashCount for sale id= "+result2[j].fkSaleId+" with qty= "+cashCount);
                                          //     }
                                          //   }
                                          // });  
                                        
                                       }
                                     });
                                  } 
                                }
                              });          
                             }
                           });
      }
    });  

});


module.exports=router;