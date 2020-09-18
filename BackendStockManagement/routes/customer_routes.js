var customer=require('../models/customer_model');
var express=require('express');
var router=express.Router();

router.post('/',function(req,res,next)
{
 customer.addCustomer(req.body,function(err,rows){
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
    customer.updateCustomer(req.params.id,req.body,function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

  router.delete("/:id", function(req, res, next) {
    customer.deleteCustomer(req.params.id,function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

router.get('/:id?',function(req,res,next){
    if(req.params.id){
    customer.getCustomerByid(req.params.id,function(err,rows){
        if(err){
            res.json(err);

        }
        else{
            res.json(rows);
        }
    });
}
else{
    customer.getAllCustomer(function(err,rows){
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