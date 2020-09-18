var db = require("../dbconnec");
var amount = {
  getAllAmountDue: function (callback) {
    //return db.query('select * from amountdue',callback);
    return db.query(
      "select * from amountdue join customer on (amountdue.fkCustomerEmailId=customer.customerEmailId)",
      callback
    );
  },
  addAmountDue: function (item, callback) {
    //let transactionDate = new Date();
    return db.query(
      "insert into amountdue (fkCustomerEmailId, amountDue, amountPaid, description) values(?,?,?,?)",
      [
        item.fkCustomerEmailId,
        item.amountDue,
        item.amountPaid,
        item.description,
      ],
      callback
    );
  },
  deleteAmountDue: function (id, callback) {
    return db.query(
      "delete from amountdue where fkCustomerEmailId=?",
      [id],
      callback
    );
  },

  getAmountDueById: function (id, callback) {
    return db.query(
      "select * from amountdue join customer on (amountdue.fkCustomerEmailId=customer.customerEmailId) and amountdue.fkCustomerEmailId=? order by amountdue.transactionDate DESC",
      [id],
      callback
    );
  },
  updateAmountDue: function (id, item, callback) {
    //let transactionDate = new Date();
    return db.query(
      "update amountdue set transactionDate=?,amountDue=?,amountPaid=?,description=? where fkCustomerEmailId=?",
      [
        item.transactionDate,
        item.amountDue,
        item.amountPaid,
        item.description,
        id,
      ],
      callback
    );
  },
  toprecordbycustomerid: function (id, callback) {
    return db.query(
      "select * from amountdue where fkCustomerEmailId=? order by transactionDate DESC LIMIT 1",
      [id],
      callback
    );
  },
};
module.exports = amount;
//fk_customer_emailId	transactionDate	amountDue	amountPaid
