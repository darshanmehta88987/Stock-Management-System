var User=require('../models/user_model');
var express=require('express');
var router=express.Router();
router.get('/',function(req,res,next){
 
    User.GetAllUser(function(err,rows){
     
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
router.get('/:user_emailId',function(req, res, next) {
  User.GetAllUserById(req.params.user_emailId,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post('/',function(req,res,next){
    User.AddUser(req.body,function(err,rows){
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

  router.post('/:user_emailId',function(req,res,next){
    User.getLogin(req.params.user_emailId,req.body,function(err,rows){
     if(err)
      {
        console.log(err);
      res.json(err);
      }
      else{
      res.json(rows);
      //console.log(rows);
      }
      });
});
router.put('/',function(req,res,next){
  User.changePassword(req.body,function(err,rows){
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

  router.put('/:id?',function(req,res,next){
    User.UpdateUser(req.params.id,req.body,function(err,rows){
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
    User.DeleteUser(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });


module.exports=router;