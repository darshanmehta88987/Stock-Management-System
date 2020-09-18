var db=require('../dbconnec'); 
 
var customer={
 

addCustomer:function(item,callback)
{
    return db.query("insert into customer values(?,?,?,?,?)",[item.customerEmailId,item.customerName,item.customerAddress,item.customerPhoneNo,item.customerGstNo],callback);
},
getAllCustomer:function(callback)
{
    return db.query("select * from customer",callback);
},
getCustomerByid:function(id,callback){
 
    return db.query("select * from customer where customerEmailId=?",[id],callback);
     
},
updateCustomer:function(id,item,callback){

        return db.query("update customer set customerName=?,customerAddress=?,customerPhoneNo=?,customerGstNo=? where customerEmailId=?",[item.customerName,item.customerAddress,item.customerPhoneNo,item.customerGstNo,item.customerEmailId],callback);
},
deleteCustomer:function(id,callback){
    return db.query("delete from customer where customerEmailId=?",[id],callback);
}


};


module.exports=customer;
