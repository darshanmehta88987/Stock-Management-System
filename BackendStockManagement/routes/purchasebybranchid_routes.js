var purchasebybranchid=require('../models/purchase_model');
var express=require('express');
var router=express.Router();

router.get('/:id',function(req, res, next) {
    purchasebybranchid.getpurchasebybranchid(req.params.id,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});


module.exports=router;