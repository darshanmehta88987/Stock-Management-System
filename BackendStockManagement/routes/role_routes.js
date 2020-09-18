var Role=require('../models/role_model');
var express=require('express');
var router=express.Router();
router.get('/',function(req,res,next){
 
    Role.getAllRole(function(err,rows){
     
    if(err)
      {
      res.json(err);
      }
      else
      {
      res.json(rows);
      }
    
    });
});

router.post('/',function(req,res,next){
  Role.AddRole(req.body,function(err,rows){
    if(err)
    {
    console.log(err);
    }
    else
    {
    res.json(rows);
    }
  });
});
router.put('/:id?',function(req,res,next){
  Role.UpdateRole(req.params.id,req.body,function(err,rows){
          if(err)
          {
          res.json(err);
          }
          else
          {
          res.json(rows);
          }
  });
 });
 router.delete('/:id', function(req, res, next) {
  Role.DeleteRole(req.params.id, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

 module.exports=router;