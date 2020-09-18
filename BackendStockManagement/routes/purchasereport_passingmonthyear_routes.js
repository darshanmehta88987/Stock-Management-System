var purchasereport_passingmonth=require('../models/report_model');
var express=require('express');
var router=express.Router();


  router.get('/:m/:d', function(req, res, next) {
   purchasereport_passingmonth.purchaseReportPassingMonthYear(req.params.m,req.params.d, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });


module.exports=router;