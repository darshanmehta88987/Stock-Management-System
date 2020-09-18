var purchase = require("../models/purchase_model");
var express = require("express");
var db=require('../dbconnec'); //reference of dbconnection.js
var router = express.Router();

router.get("/:id?", function(req, res, next) {
  if (req.params.id) {
    purchase.getPurchasebyid(req.params.id,function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    purchase.getAllPurchase(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.delete("/:purchaseId", function(req, res, next) {
  console.log("Inside 1");
  db.query("select * from purchase where purchaseId=?",[req.params.purchaseId],function (err, result, fields) {
    console.log("Inside 2");
      if(result){
        console.log("Inside 3");
        console.log(req.params.purchaseId);
        db.query("select * from purchasedetails where fkPurchaseId = ?",[req.params.purchaseId],function(err1,result1,fields1){
          if(result1){
            console.log("Inside 4");
            console.log(result1.length);
            let myBranch=result[0].fkBranchId;
            let stockUsage=[];
            let promise = new Promise((resolve,reject)=>{
              let i=0;
              console.log(result1.length);
                for(i=0;i<result1.length;i++){
                  console.log("Adding Stock= "+parseInt(result1[i].purchaseQuantity));
                  stockUsage.push({
                    itemId:result1[i].fkItemId,
                    branchId:myBranch,
                    stock:parseInt(result1[i].purchaseQuantity)
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
                              stockUsage[z].stock=parseInt(result2[j].stockQuantity) - parseInt(stockUsage[z].stock); 
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
                                  purchase.deletePurchase(req.params.purchaseId, function(err, rows) {
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
  
          db.query("delete from purchase where purchaseId in (?)",[req.body],function(err1,rows){
            if (err1) {
              res.json(err1);
            } else {
              res.json(rows);
            }
          });  
  
});

router.put("/:purchaseId", function(req, res, next) {
  purchase.updatePurchase(req.params.purchaseId,req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post("/", function(req, res, next) {
  purchase.addPurchase(req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);

      // purchase.getPurchaseId(req.body,function(err1,rows1){
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
  });
});

module.exports = router;
