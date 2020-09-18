var db = require("../dbconnec"); //reference of dbconnection.js

var invoice = {
  getInvoice: function (callback) {
    return db.query(
      "select * from invoice join customer on (invoice.fkCustomerEmailId=customer.customerEmailId)",
      callback
    );
  },
  getInvoiceById: function (Id, callback) {
    return db.query(
      "select * from invoice join customer on (invoice.fkCustomerEmailId=customer.customerEmailId) and fkCustomerEmailId=? order by invoice.invoiceDate desc",
      [Id],
      callback
    );
  },

  addInvoice: function (item, callback) {
    return db.query(
      "insert into invoice(invoiceName,invoiceDate,fkCustomerEmailId) values(?,?,?)",
      [item.invoiceName, item.invoiceDate, item.fkCustomerEmailId],
      callback
    );
  },
  // getInvoiceByIdInvoiceGenerated:function(Id,callback)
  // {
  //     return db.query("select * from sale where fkCustomerEmailId=? and isInvoiceGenerated=0 and createdRecordDate<= NOW() ",Id,callback);
  // },
  updateInvoiceGeneratedToTwo: function (id, body, callback) {
    return db.query(
      "update sale set isInvoiceGenerated=2 where fkCustomerEmailId=? and isInvoiceGenerated=1",
      [id],
      callback
    );
  },
};
module.exports = invoice;
