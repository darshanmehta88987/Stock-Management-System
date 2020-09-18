var amount = require("../models/amountdue_model");
var express = require("express");
var router = express.Router();

router.get("/:id?", function (req, res, next) {
  if (req.params.id) {
    amount.getAmountDueById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    amount.getAllAmountDue(function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.delete("/:fk_customer_emailId", function (req, res, next) {
  amount.deleteAmountDue(req.params.fk_customer_emailId, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.put("/:fk_customer_emailId", function (req, res, next) {
  amount.updateAmountDue(req.params.fk_customer_emailId, req.body, function (
    err,
    rows
  ) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post("/", function (req, res, next) {
  amount.addAmountDue(req.body, function (err, rows) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
