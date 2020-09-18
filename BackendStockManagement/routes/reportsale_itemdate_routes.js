var salereport=require('../models/report_model');
var express=require('express');
var router=express.Router();
router.get('/:iid/:sd/:ed/:bid',function(req, res, next) {
  salereport.getSaleReportByDateAndItemPassedBranchId(req.params.iid,req.params.sd,req.params.ed,req.params.bid,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.get('/:iid/:sd/:ed',function(req, res, next) {
  salereport.getSaleReportByDateAndItemPassed(req.params.iid,req.params.sd,req.params.ed,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});


module.exports=router;