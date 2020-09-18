var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var customer = require("./routes/customer_routes");
var branch = require("./routes/branch_routes");
var role = require("./routes/role_routes");
var User = require("./routes/user_routes");
var login = require("./routes/login_routes");
var Sale = require("./routes/sale_routes");
var Stock = require("./routes/stock_routes");
var item = require("./routes/item_routes");
var saletype = require("./routes/saletype_routes");
var supplier = require("./routes/supplier_routes");
var saledetail = require("./routes/saledetail_routes");
var purchase = require("./routes/purchase_routes");
var purchasedetail = require("./routes/purchasedetail_routes");
var forgetPassMail = require("./routes/forgetPassMail_routes");
var changepassword = require("./routes/user_routes");
var saledetail_item = require("./routes/saledetails_item_join_routes");
var purchasedetail_item = require("./routes/purchasedetails_item_join_routes");
var amount = require("./routes/amountdue_routes");
var salebybranchid = require("./routes/salebybranchid_routes");
var purchasebybranchid = require("./routes/purchasebybranchid_routes");
var userbybranchid = require("./routes/userbybranchid_routes");
var stockbybranchid = require("./routes/stockbybranchid_routes");
var salejoinbycustomerid = require("./routes/salejoinbycustomerid_routes");
var toprecordbycustomerid = require("./routes/toprecordbycustomerid_routes");
var invoice = require("./routes/invoice_routes");
var invoiceupload = require("./routes/invoicefileupload_routes");
var report = require("./routes/report_routes");
var purchasereport = require("./routes/report_purchase_routes");
var salereportitemdate = require("./routes/reportsale_itemdate_routes");
var purchasereportdateitem = require("./routes/report_purchase_itemdate_routes");
var salereportbymonth = require("./routes/salereport_month_routes");
var purchasereportbymonth = require("./routes/purchase_report_month_routes");
var stockreport = require("./routes/report_stock_routes");
var salereportpassingmonthyear = require("./routes/salereport_passingmonth_routes");
var purchasereportpassingmonthyear = require("./routes/purchasereport_passingmonthyear_routes");
var reorder = require("./routes/reorderstock_routes");
var chartreport = require("./routes/chart_report_routes");
var invoicegenerated = require("./routes/Invoicegeneratedzero_routes");
var creditortotalpendingamount = require("./routes/getallcreditor_totalpending_routes");
var creditorwithlastpaydate = require("./routes/creditor_pendingamt_bylastpaydate_routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/customer", customer);
app.use("/branch", branch);
app.use("/role", role);
app.use("/User", User);
app.use("/login", login);
app.use("/Sale", Sale);
app.use("/Stock", Stock);
app.use("/item", item);
app.use("/saletype", saletype);
app.use("/supplier", supplier);
app.use("/saledetail", saledetail);
app.use("/purchase", purchase);
app.use("/purchasedetail", purchasedetail);
app.use("/sendMail", forgetPassMail);
app.use("/changepassword", changepassword);
app.use("/saledetail_item", saledetail_item);
app.use("/purchasedetail_item", purchasedetail_item);
app.use("/amountdue", amount);
app.use("/salebybranchid", salebybranchid);
app.use("/purchasebybranchid", purchasebybranchid);
app.use("/userbybranchid", userbybranchid);
app.use("/stockbybranchid", stockbybranchid);
app.use("/salejoinbycustomerid", salejoinbycustomerid);
app.use("/toprecordbycustomerid", toprecordbycustomerid);
app.use("/invoice", invoice);
app.use("/invoiceupload", invoiceupload);
app.use("/report", report);
app.use("/purchasereport", purchasereport);
app.use("/salereportitemdate", salereportitemdate);
app.use("/purchasereportdateitem", purchasereportdateitem);
app.use("/salereportbymonth", salereportbymonth);
app.use("/purchasereportbymonth", purchasereportbymonth);
app.use("/stockreport", stockreport);
app.use("/salereportpassingmonthyear", salereportpassingmonthyear);
app.use("/purchasereportpassingmonthyear", purchasereportpassingmonthyear);
app.use("/reorder", reorder);
app.use("/chartreport", chartreport);
app.use("/invoicegenerated", invoicegenerated);
app.use("/creditortotalpendingamount", creditortotalpendingamount);
app.use("/creditorwithlastpaydate", creditorwithlastpaydate);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var db = require("./dbconnec"); //reference of dbconnection.js
const cron = require("node-cron"); // for cron job
const axios = require("axios");

// FOR TESTING - run task at every minute
// cron.schedule("* * * * *", () => {
// run at everyday 9:00 PM
cron.schedule("0 21 * * *", () => {
  //   console.log("run task at every minute");
  axios
    .get("http://localhost:4000/reorder")
    .then((response1) => {
      if (response1.status == 200) {
        console.log("Reorder email sent");
      } else {
        console.log("Failed to send reorder email");
      }
    })
    .catch((err1) => {
      console.log(err1);
    });
});
cron.schedule("0 0 * * *", () => {
  db.query("update branch set cash = 0", (err, data) => {
    if (err) console.log("error updating branch cash");
    else console.log("branch cash settled to 0");
  });
});
module.exports = app;
