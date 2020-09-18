// var Mymail=require('../models/forgetPassMail');
let nodemailer = require("nodemailer");
var db = require("../dbconnec"); //reference of dbconnection.js

var express = require("express");
var router = express.Router();
router.get("/:userEmailId", function (req, res, next) {
  // Mymail.sendEmail(req.params.userEmailId,function(err,status){
  //     if(err)
  //       {
  //         res.json(err);
  //       }
  //       else
  //       {
  //         res.json(status);
  //       }

  //     });
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: "chiragshah.vardhmanxerox@gmail.com",
      pass: "vardhmanxerox@123",
    },
    tls: {
      rejectUnauthorised: false,
    },
  });
  let otp = "";
  // let p = new Promise(resolve1=>{
  let digits = "0123456789";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  let datetime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  );
  let expiretime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  );
  expiretime.setMinutes(expiretime.getMinutes() + 5);
  // resolve(374); // never gets here :(
  let s = db.query("update User set otp=?,otpTime=? where userEmailId=?", [
    otp,
    expiretime,
    req.params.userEmailId,
  ]);
  if (s) {
    console.log("Inside 1. Transporter ");
    console.log(transporter);
    // resolve1()
  }
  // });
  // p.then(resolve1=>{
  console.log("Inside 2");
  var mailOptions = {
    from: "chiragshah.vardhmanxerox@gmail.com",
    to: req.params.userEmailId,
    subject: "OTP For Reset Password",
    text:
      "Thanks for registration with our website. This is your OTP " +
      otp +
      " This OTP is Only valid for 6 Hours",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      // console.log(info.response);
      // return db.query(info,callback);
      res.json(info);
    }
  });
});
module.exports = router;
