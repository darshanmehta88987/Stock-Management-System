var db = require("../dbconnec");
const uuid = require("uuid-random");

var purchase = {
  getAllPurchase: function (callback) {
    return db.query(
      "select * from purchase join branch on (purchase.fkBranchId=branch.branchId) join supplier on(purchase.fkSupplierEmailId=supplier.supplierEmailId)",
      callback
    );
  },
  addPurchase: function (item, callback) {
    // return db.query("insert into purchase(purchaseId,purchaseDate,fkSupplierEmailId,fkBranchId) values(?,?,?,?)",[item.purchaseId,item.purchaseDate,item.fkSupplierEmailId,item.fkBranchId],callback);

    let u = uuid();

    let promise = new Promise((resolve, reject) => {
      let d = db.query(
        "insert into purchase(purchaseId,purchaseDate,fkSupplierEmailId,fkBranchId) values(?,?,?,?)",
        [u, item.purchaseDate, item.fkSupplierEmailId, item.fkBranchId]
      );
      if (d) resolve(d);
      else reject(d);
    });
    promise.then(
      function (res) {
        return callback(false, u);
      },
      function (rej) {
        return callback(rej, false);
      }
    );
  },
  deletePurchase: function (id, callback) {
    return db.query("delete from purchase where purchaseId=?", [id], callback);
  },

  getPurchasebyid: function (id, callback) {
    return db.query(
      "select * from purchase join branch on (purchase.fkBranchId=branch.branchId) join supplier on(purchase.fkSupplierEmailId=supplier.supplierEmailId) where purchaseId=?",
      [id],
      callback
    );
  },
  updatePurchase: function (id, item, callback) {
    return db.query(
      "update purchase set purchaseDate=?,fkSupplierEmailId=?,fkBranchId=? where purchaseId=?",
      [item.purchaseDate, item.fkSupplierEmailId, item.fkBranchId, id],
      callback
    );
  },
  // getPurchaseId:function(item,callback)
  // {
  //     return db.query("select purchaseId from purchase where purchaseDate=? and fkSupplierEmailId=? and fkBranchId=?",[item.purchaseDate,item.fkSupplierEmailId,item.fkBranchId],callback);
  // }

  getpurchasebybranchid: function (id, callback) {
    return db.query(
      "select * from purchase join supplier on (purchase.fkSupplierEmailId=supplier.supplierEmailId) where fkBranchId=? order by purchase.purchaseDate desc",
      [id],
      callback
    );
  },
};
module.exports = purchase;
