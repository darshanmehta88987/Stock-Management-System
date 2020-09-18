var db = require("../dbconnec");
var saledetail = {
  getAllSalesdetail: function (callback) {
    // return db.query('select * from salesdetails',callback);
    return db.query(
      "select * from salesdetails as sd join sale as s on s.saleId=sd.fkSaleId join item as i on sd.fkItemId=i.itemId",
      callback
    );
  },
  addSalesdetail: function (item, callback) {
    console.log("hehe");
    return db.query(
      "insert into salesdetails values(?,?,?)",
      [item.fkSaleId, item.fkItemId, item.saleQuantity],
      callback
    );
  },
  deleteSalesdetail: function (sid, callback) {
    return db.query(
      "delete from salesdetails where fkSaleId=?",
      [sid],
      callback
    );
  },

  getSalesdetailbyid: function (sid, callback) {
    return db.query(
      "select * from salesdetails as sd join sale as s on s.saleId=sd.fkSaleId join item as i on sd.fkItemId=i.itemId and fkSaleId in (?)",
      [sid],
      callback
    );
  },
  updateSalesdetail: function (sid, item, callback) {
    return db.query(
      "update salesdetails set fkItemId=?,saleQuantity=? where fkSaleId=?",
      [item.fkItemId, item.saleQuantity, sid],
      callback
    );
  },
  saledetailAndItemjoinbyid: function (id, callback) {
    return db.query(
      "select * from salesdetails s,item i where s.fkItemId=i.itemId and  s.fkSaleId=?",
      [id],
      callback
    );
  },
  salejoinbycustomerid: function (id, callback) {
    db.query(
      `
            update sale
            set isInvoiceGenerated=1
            where isInvoiceGenerated = 0
            and fkCustomerEmailId = ?
        `,
      [id]
    );
    return db.query(
      `select i.*,sd.fkItemId,sum(sd.saleQuantity) as totalquantity 
            from Sale s,salesdetails sd,item i
            where s.saleId=sd.fkSaleId 
            and i.itemId=sd.fkItemId 
            and s.fkCustomerEmailId=? 
            and (isInvoiceGenerated=0 
            or isInvoiceGenerated=1)    
            GROUP BY sd.fkItemId`,
      [id],
      callback
    );
  },
};
module.exports = saledetail;
