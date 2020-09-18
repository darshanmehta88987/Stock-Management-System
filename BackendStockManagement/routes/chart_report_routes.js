var chart_report=require('../models/report_model');
var express=require('express');
var router=express.Router();
var db=require('../dbconnec'); //reference of dbconnection.js

router.get('/',function(req,res,next){
    // if(req.params.id){
        chart_report.getChartData(function(err,rows){
            if(err){
                res.json(err);

            }
            else{
                res.json(rows);
            }
        });
    // }
});
router.get('/:id',function(req, res, next) {
    chart_report.getChartDataByBranch(req.params.id,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});


module.exports=router;