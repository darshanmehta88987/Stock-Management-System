var db = require("../dbconnec");

var reorder = {
  getBranchBYName: function (callback) {
    return db.query("select branchId from branch", callback);
  },

  getitemforreorder: function (bid, callback) {
    return db.query(
      "select * from item join stock on (item.itemId=stock.fkItemId) join branch on (stock.fkBranchId=branch.branchId) join User on (User.fkBranchId=branch.branchId) join role on (role.roleId=User.fkRoleId) where stock.stockQuantity<=item.reorderLevel  and role.roleName='Admin' and branch.branchId=?  ",
      [bid],
      callback
    );
  },
};

module.exports = reorder;
