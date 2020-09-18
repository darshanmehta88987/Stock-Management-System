var stockreport=require('../models/report_model');
var express=require('express');
var router=express.Router();

  router.get('/:fk_branchId', function(req, res, next) {
    stockreport.stockItemBranchId(req.params.fk_branchId, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

module.exports=router;