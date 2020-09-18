var saletype=require('../models/saletype_model');
var express=require('express');
var router=express.Router();

router.post('/',function(req,res,next)
{
 saletype.addSaleType(req.body,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
        });
});

router.put("/:id", function(req, res, next) {
    saletype.updateSaleType(req.params.id,req.body,function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

router.delete("/:id", function(req, res, next) {
    saletype.deleteSaleType(req.params.id,function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

router.get('/:id?',function(req,res,next){
    if(req.params.id){
    saletype.getSaleTypeByid(req.params.id,function(err,rows){
        if(err){
            res.json(err);

        }
        else{
            res.json(rows);
        }
    });
}
else{
    saletype.getAllSaleType(function(err,rows){
        if(err){
            res.json(err);

        }
        else{
            res.json(rows);
        }
});
}
});
module.exports=router;