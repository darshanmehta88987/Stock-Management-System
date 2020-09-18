var creditorwithdate=require('../models/report_model');
var express=require('express');
var router=express.Router();


router.get('/',function(req,res,next){
   

    creditorwithdate.getAllCreditorwithlastpaydate(function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }

});
});
router.get('/:name',function(req, res, next) {
    creditorwithdate.getCreditorByName(req.params.name,function(err, rows) {
      if (err) {
        
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });
module.exports=router;