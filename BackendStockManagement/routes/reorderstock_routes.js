var reorder = require("../models/reorderstock_model");
var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

router.get("/", function (req, res, next) {
  reorder.getBranchBYName(function (err, rows) {
    for (i = 0; i < rows.length; i++) {
      reorder.getitemforreorder(rows[i].branchId, function (err, result) {
        if (err) {
          res.json(err);
        } else {
          //res.json(rows);
          console.log(result);
          let itemList = "";
          let branchName;
          let email = "";
          for (i = 0; i < result.length; i++) {
            email = result[0].userEmailId;
            console.log(result[i]);
            branchName = result[i].branchName;
            itemList +=
              "<tr>" +
              "<td>" +
              result[i].name +
              "</td>" +
              "<td>" +
              result[i].gsm +
              "</td>" +
              "<td>" +
              result[i].size +
              "</td>" +
              "<td>" +
              result[i].stockQuantity +
              "</td>" +
              "</tr>";
          }

          if (result.length != 0) {
            var transporter = nodemailer.createTransport({
              service: "gmail",

              auth: {
                user: "chiragshah.vardhmanxerox@gmail.com",
                pass: "vardhmanxerox@123",
              },
              tls: {
                rejectUnauthorized: false,
              },
            });

            var mailOptions = {
              from: "chiragshah.vardhmanxerox@gmail.com",

              to: email,

              subject:
                "Reminder for re-ordering items (" + branchName + " Branch)",

              //text:rows[i].itemId,
              html:
                " <h2>The following items are below the reorder level in " +
                branchName +
                " branch :</h2> <br>" +
                '<table border style="border:1px solid black;"> ' +
                "<tr>" +
                "<th>  Item Name      </th>" +
                "<th>  GSM  </th>" +
                "<th>  Size  </th>" +
                "<th>  Current Stock  </th>" +
                "</tr>" +
                itemList +
                "</table>",
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          }
        }
      });
    }
  });
});

module.exports = router;
