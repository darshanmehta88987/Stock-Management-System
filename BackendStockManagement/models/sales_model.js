var db=require('../dbconnec'); //reference of dbconnection.js
const uuid=require("uuid-random"); 
var sale={
 
    
GetAllSale:function(callback){
 
  return db.query("select * from Sale join branch on (Sale.fkBranchId=branch.branchId) join customer on(Sale.fkCustomerEmailId=customer.customerEmailId) join salestype on (Sale.fkSaleTypeId=salestype.saleTypeId)",callback);    
        
} ,

GetAllSaleById:function(id,callback){
 
    return db.query("select * from Sale join branch on (Sale.fkBranchId=branch.branchId) join customer on(Sale.fkCustomerEmailId=customer.customerEmailId) join salestype on (Sale.fkSaleTypeId=salestype.saleTypeId) where saleId=?",[id],callback);
        } ,    

        
addSale:function(item,callback){  
// return db.query("insert into Sale(saleId,salesDate,isInvoiceGenerated,fkSaleTypeId,fkCustomerEmailId,fkBranchId) values(?,?,?,?,?,?)",[item.saleId,item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId],callback);

        
let u=uuid();
           
let promise= new Promise((resolve, reject) => {
    let d=db.query("insert into Sale(saleId,salesDate,isInvoiceGenerated,fkSaleTypeId,fkCustomerEmailId,fkBranchId) values(?,?,?,?,?,?)",[u,item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId]);
    // console.log(d);
    if(d) resolve(d);
  
    else reject(d);
});
promise.then(function(res){
    return callback(false,u);

},
function(rej){
   
 return callback(rej,false);
   
});
    

},
    
updateSale:function(id,item,callback){
             return db.query("update Sale set salesDate=?,isInvoiceGenerated=?,fkSaleTypeId=?,fkCustomerEmailId=?,fkBranchId=? where saleId=?",[item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId,item.saleId] ,callback)
    },

    deleteSale:function(id,callback){
            
                return db.query("delete from Sale where saleId in (?)",[id],callback);
            
      },
 
// getId:function(item,callback)
// {
//         return db.query("select saleId from Sale where salesDate=? and isInvoiceGenerated=? and fkSaleTypeId=? and fkCustomerEmailId=? and fkBranchId=?",[item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId],callback);
// }



getsalebybranchid:function(id,callback){
   return db.query("select * from Sale join customer on (Sale.fkCustomerEmailId=customer.customerEmailId) where fkBranchId=? order by Sale.salesDate desc",[id],callback);
}
  
}
 module.exports=sale;
