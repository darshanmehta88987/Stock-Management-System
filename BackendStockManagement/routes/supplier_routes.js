var supplier = require("../models/supplier_model");
var express = require("express");
var router = express.Router();

router.get("/:id?", function(req, res, next) {
  if (req.params.id) {
   supplier.getSupplierById(req.params.id,function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    supplier.getAllSupplier(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.delete("/:supplier_emailId", function(req, res, next) {
  supplier.deleteSupplier(req.params.supplier_emailId, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/email/:email_id?',function(req,res,next){
  supplier.getSupplierByEmail(req.params.email_id,function(err,rows){
      if(err){
          res.json(err);
      }
      else{
          res.json(rows);
      }    
  });
});

router.put("/:supplier_emailId", function(req, res, next) {
  supplier.updateSupplier(req.params.supplier_emailId,req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post("/", function(req, res, next) {
  supplier.addSupplier(req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
