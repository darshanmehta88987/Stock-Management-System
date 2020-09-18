var item=require('../models/item_model');
var express=require('express');
var router=express.Router();
var db=require('../dbconnec'); //reference of dbconnection.js


router.post('/',function(req,res,next)
{
 item.addItem(req.body,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            // console.log(rows);
            res.json(rows);
        }
        });
});

router.put("/:id", function(req, res, next) {
    item.updateItem(req.params.id,req.body,function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

router.delete("/:id", function(req, res, next) {
    item.deleteItem(req.params.id,function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

router.get('/:id?',function(req,res,next){
    if(req.params.id){
    item.getItemByid(req.params.id,function(err,rows){
        if(err){
            res.json(err);

        }
        else{
            res.json(rows);
        }
    });
}
else{
    item.getAllItem(function(err,rows){
        if(err){
            res.json(err);

        }
        else{
            res.json(rows);
        }
});
}
});
router.get('/name/:name?',function(req,res,next){
    item.getItemByName(req.params.name,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }    
    });
});
// router.get('/itemSize/:size',function(req,res,next){
//     db.query("select itemId from item where size=?",[req.params.size],function(err,result,fields){
        
//             if(err){
//               res.json(err);
//             }
//             else{
//                 res.send(result[0].itemId);
//                 res.end();
//             }
//       });
// });
module.exports=router;