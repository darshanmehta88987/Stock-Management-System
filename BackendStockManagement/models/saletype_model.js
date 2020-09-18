var db=require('../dbconnec'); 
 
var saletype={
 

addSaleType:function(itemt,callback)
{
    return db.query('insert into salestype (saleType) values(?)',[itemt.saleType],callback);
},
getAllSaleType:function(callback)
{
    return db.query("select * from salestype",callback);
},
getSaleTypeByid:function(id,callback){ 
    return db.query("select * from salestype where saleTypeId=?",[id],callback);     
},
updateSaleType:function(id,itemt,callback){
    return db.query("update salestype set saleType=? where saleTypeId=?",[itemt.saleType,id],callback);
},
deleteSaleType:function(id,callback){
    return db.query("delete from salestype where saleTypeId=?",[id],callback);
}


};


module.exports=saletype;