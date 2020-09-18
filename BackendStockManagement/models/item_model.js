var db = require("../dbconnec");
const uuid = require("uuid-random");

var item = {
  addItem: function (itemt, callback) {
    //     var todaydate=new Date();
    let u = uuid();
    // console.log(u);
    // return db.query("insert into Sale(saleId,salesDate,isInvoiceGenerated,fkSaleTypeId,fkCustomerEmailId,fkBranchId) values(?,?,?,?,?,?)",[u,item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId],callback);
    let promise = new Promise((resolve, reject) => {
      let d = db.query(
        "insert into item (itemId,name,gsm,size,minimumRate,reorderLevel) values(?,?,?,?,?,?)",
        [
          u,
          itemt.name,
          itemt.gsm,
          itemt.size,
          itemt.minimumRate,
          itemt.reorderLevel,
        ]
      );
      if (d) resolve(d);
      else reject(d);
    });
    promise.then(
      function (res) {
        return callback(false, u);
      },
      function (rej) {
        // let r=db.query("Select branchId from branch where branchId=?",u);
        // console.log(r.values);
        return callback(rej, false);
        // return db.query(r.values,callback);
      }
    );
  },
  getAllItem: function (callback) {
    return db.query(
      "select * from item", // left join supplier on (item.fkSupplierEmailId=supplier.supplierEmailId)",
      callback
    );
  },
  getItemByid: function (id, callback) {
    return db.query(
      "select * from item where itemId=?", // join supplier on (item.fkSupplierEmailId=supplier.supplierEmailId) and itemId=?",
      [id],
      callback
    );
  },
  getItemByName: function (name, callback) {
    // console.log("Called");
    return db.query("select name from item where name=?", [name], callback);
  },
  updateItem: function (id, itemt, callback) {
    return db.query(
      "update item set name=?,gsm=?,size=?,minimumRate=?,reorderLevel=? where itemId=?",
      [
        itemt.name,
        itemt.gsm,
        itemt.size,
        itemt.minimumRate,
        itemt.reorderLevel,
        itemt.itemId,
      ],
      callback
    );
  },
  deleteItem: function (id, callback) {
    return db.query("delete from item where itemId=?", [id], callback);
  },
};

module.exports = item;
