var saledetail = require("../models/saledetail_model");
var express = require("express");
var router = express.Router();
var db = require("../dbconnec"); //reference of dbconnection.js

router.get("/", function (req, res, next) {
  saledetail.getAllSalesdetail(function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.get("/:sid", function (req, res, next) {
  saledetail.getSalesdetailbyid(req.params.sid, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.delete("/:sid", function (req, res, next) {
  console.log("Inside 1");
    db.query("select * from sale where saleId=?",[req.params.sid],function (err, result, fields) {
      console.log("Inside 2");
        if(result){
          console.log("Inside 3");
          console.log(req.params.sid);
          db.query("select * from salesdetails where fkSaleId = ?",[req.params.sid],function(err1,result1,fields1){
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
                                    saledetail.deleteSalesdetail(req.params.sid, function (err, rows) {
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

router.put("/:sid", function (req, res, next) {
  saledetail.updateSalesdetail(req.params.sid, req.body, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/", function (req, res, next) {
  saledetail.addSalesdetail(req.body, function (err4, rows4) {
    // console.log("Inside 2");
    if (err4) {
      res.json(err4);
    } else {
      res.json(rows4);
      // console.log("sale detail"+rows);
    
  // db.query(
  //   "select * from Stock where fkItemId=? and fkBranchId=?",
  //   [req.body.fkItemId, req.body.branchId],
  //   function (err1, result1, fields1) {
  //       console.log(req.body);
  //       let newStock = result1[0].stockQuantity - req.body.saleQuantity;
  //       console.log("Inside saleDetails " + result1[0]);
  //       db.query(
  //         "update Stock set stockQuantity=? where fkItemId=? and fkBranchId=?",
  //         [newStock, req.body.fkItemId, req.body.branchId],
  //         function (err2, result2, fields2) {
  //           if(result2){
  //             console.log("Inside 1");
  //             res.json(rows4);
  //           }
  //         }
  //       );
  //   }
  // );
}
});
});

module.exports = router;
