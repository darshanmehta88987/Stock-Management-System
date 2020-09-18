var invoicegenerated=require('../models/invoice_model');
var express=require('express');
var router=express.Router();

// router.get('/:id',function(req, res, next) {
//     invoicegenerated.getInvoiceByIdInvoiceGenerated(req.params.id,function(err, rows) {
//     if (err) {
      
//       res.json(err);
//     } else {
//       res.json(rows);
//     }
//   });
// });

router.put("/:id", function(req, res, next) {
    invoicegenerated.updateInvoiceGeneratedToTwo(req.params.id,req.body,function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });



module.exports=router;