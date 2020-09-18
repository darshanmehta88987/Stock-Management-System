var db=require('../dbconnec');
var purchasedetail={
    getAllPurDetail:function(callback){
       // return db.query('select * from purchasedetails',callback);
       return db.query('select * from purchasedetails join item on (purchasedetails.fkItemId=item.itemId) join purchase on (purchase.purchaseId=purchasedetails.fkPurchaseId)',callback);
    },
    addPurDetail:function(item,callback){
        return db.query("insert into purchasedetails values(?,?,?)",[item.fkPurchaseId,item.fkItemId,item.purchaseQuantity],callback);
    },
    deletePurDetail:function(id,callback){
        return db.query("delete from purchasedetails where fkPurchaseId=?",[id],callback);
    },
   
    getPurDetailbyid:function(id,callback){
        return db.query("select * from purchasedetails join item on (purchasedetails.fkItemId=item.itemId) join purchase on (purchase.purchaseId=purchasedetails.fkPurchaseId) and purchasedetails.fkPurchaseId=?",[id],callback);
    },
    updatePurDetail:function(id,item,callback){

        return db.query("update purchasedetails set fkItemId=?,purchaseQuantity=? where fkPurchaseId=?",[item.fkItemId,item.purchaseQuantity,id],callback);
    },
    purchasedetailAndItemjoinbyid:function(id,callback)
    {
        return db.query("select * from purchasedetails join item on (purchasedetails.fkItemId=item.itemId) and  purchasedetails.fkPurchaseId=?",[id],callback);   
    }

};
module.exports=purchasedetail;