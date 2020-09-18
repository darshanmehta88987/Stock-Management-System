var db=require('../dbconnec');
var supplier={
    getAllSupplier:function(callback){
        return db.query('select * from supplier',callback);
    },
    addSupplier:function(item,callback){
        return db.query("insert into supplier values(?,?,?,?,?)",[item.supplierEmailId,item.supplierName,item.supplierAddress,item.supplierPhoneNo,item.supplierGstNo],callback);
    },
    deleteSupplier:function(id,callback){
        return db.query("delete from supplier where supplierEmailId=?",[id],callback);
    },
    getSupplierByEmail: function (email_id, callback) {
        //console.log("Called");
        return db.query("select supplierEmailId from supplier where supplierEmailId=?", [email_id], callback);
      },
    getSupplierById:function(id,callback){
        return db.query("select * from supplier where supplierEmailId=?",[id],callback);
    },
    updateSupplier:function(id,item,callback){

        return db.query("update supplier set supplierName=?,supplierAddress=?,supplierPhoneNo=?,supplierGstNo=? where supplierEmailId=?",[item.supplierName,item.supplierAddress,item.supplierPhoneNo,item.supplierGstNo,id],callback);
    }

};
module.exports=supplier;
//supplier_emailId	supplier_name	supplier_address	supplier_phoneNo	