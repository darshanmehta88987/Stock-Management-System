var db = require("../dbconnec"); //reference of dbconnection.js
var stock = require("../models/stock_model");
var express = require("express");
var db = require("../dbconnec"); //reference of dbconnection.js

var router = express.Router();
router.get("/", function (req, res, next) {
  stock.GetAllStock(function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.get("/:item_id/:branch_id", function (req, res, next) {
  stock.GetAllStockById(req.params.item_id, req.params.branch_id, function (
    err,
    rows
  ) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/", function (req, res, next) {
  stock.addStock(req.body, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});

router.put("/:fk_itemId?/:fk_branchId?", function (req, res, next) {
  stock.updateStock(
    req.params.fk_itemId,
    req.params.fk_branchId,
    req.body,
    function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    }
  );
});
router.delete("/:fk_itemId/:fk_branchId", function (req, res, next) {
  stock.deleteStock(req.params.fk_itemId, req.params.fk_branchId, function (
    err,
    rows
  ) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/managestock/:fk_itemId/:fk_branchId", function (req, res, next) {
  db.query(
    "select * from stock where fkItemId=? and fkBranchId= ?",
    [req.params.fk_itemId, req.params.fk_branchId],
    function (err, result, fields) {
      console.log(req.params)
      console.log(req.params.fk_itemId+" ---- " +req.params.fk_branchId)
      console.log(req.body.stockQuantity+" - "+result[0]);
      // console.log(result);
      let newStock = result[0].stockQuantity - req.body.stockQuantity;
      // console.log("New= "+newStock);
      if (req.body.lastUpdatedDate == undefined) {
        // console.log(req.body);
        db.query(
          "update Stock set stockQuantity=? where fkItemId=? and fkBranchId=?",
          [newStock, req.params.fk_itemId, req.params.fk_branchId],
          function (err1, result1, fields1) {
            // console.log(result1);
            if (err1) {
              res.json(err);
            } else {
              res.send("Done");
              res.end();
            }
          }
        );
      } else {
        db.query(
          "update Stock set stockQuantity=? , lastUpdatedDate=? where fkItemId=? and fkBranchId=?",
          [
            newStock,
            req.body.lastUpdatedDate,
            req.params.fk_itemId,
            req.params.fk_branchId,
          ],
          function (err1, result1, fields1) {
            // console.log("Inside else");
            if (err1) {
              res.json(err);
            } else {
              res.send("Done");
              res.end();
            }
          }
        );
      }
    }
  );
});
module.exports = router;
