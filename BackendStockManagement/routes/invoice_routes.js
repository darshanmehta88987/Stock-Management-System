var invoice = require("../models/invoice_model");
var express = require("express");
var router = express.Router();

router.get('/:id',function(req, res, next) {
    invoice.getInvoiceById(req.params.id,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.get('/',function(req,res,next){
 
    invoice.getInvoice(function(err,rows){
     
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

router.post("/", function(req, res, next) {
  invoice.addInvoice(req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
