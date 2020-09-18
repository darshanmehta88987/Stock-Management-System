 var express = require("express");
var router = express.Router();
var multer=require('multer');
var fs = require('fs');
var mv=require('mv');
var formidable = require('formidable');

 
router.post('/', function (req, res) {
  var form=new formidable.IncomingForm();
  form.parse(req,function(err, fields, files){
                       let myfile=files.filename.name;
                       let oldpath=files.filename.path;
                       let newpath='./public/uploads/'+myfile;
                       mv(oldpath,newpath,function(err){
                           if(err) next(createError(500));
                           else {
                             res.send("Done");
                             res.end();
                           } 
                       });
    });
 
});
router.get('/:id', function (req, res, next) {
  var filePath = './public/uploads/'+req.params.id; // Or format the path using the `id` rest param
  var fileName = req.params.id; // The default name the browser will use

  res.download(filePath, fileName);    
});
module.exports=router;