var db=require('../dbconnec'); 

 
var report={
getSaleReportBetweenDatePassedBranchId:function(sd,ed,bid,callback){
    

    return db.query("select f.name, SUM(f.saleQuantity) as Quantity from "+
    " (select i.name,sd.saleQuantity,s.fkBranchId from salesdetails as sd "+
    "join sale as s on s.saleId=sd.fkSaleId join item as i on i.itemId=sd.fkItemId "+
    " where s.fkBranchId=? and s.salesDate BETWEEN ? and ?) as f group by(f.name)",[bid,sd,ed],callback);
     
},
getSaleReportBetweenDatePassed:function(sd,ed,callback){
    // return db.query("select f.itemId,f.name, SUM(f.saleQuantity) as Quantity,f.fkBranchId,f.branchName from "
    // +"(select i.itemId,i.name,sd.saleQuantity,s.fkBranchId,b.branchName from salesdetails as sd "+
    // " join sale as s on s.saleId=sd.fkSaleId join item as i on i.itemId=sd.fkItemId join branch as b on b.branchId=s.fkBranchId"+
    // " where s.salesDate BETWEEN ? and ?) as f group by(f.name)",[sd,ed],callback);
    return db.query("select i.name,i.itemId,b.branchId,sum(sd.saleQuantity) as Quantity,b.branchName from sale s ,salesdetails sd,item i,branch b where s.saleId=sd.fkSaleId and i.itemId=sd.fkItemId and b.branchId=s.fkBranchId and s.salesDate BETWEEN ? and ? group by i.name,b.branchName   ",[sd,ed],callback);
  
      
},
getPurchaseReportBetweenDatePassedBranchId:function(sd,ed,bid,callback){
    

    return db.query("select f.name, SUM(f.purchaseQuantity) as Quantity from "+
    "(select i.name,pd.purchaseQuantity,p.fkBranchId from purchasedetails as pd"+
    " join purchase as p on p.purchaseId=pd.fkpurchaseId join item as i on i.itemId=pd.fkItemId "+
    "where p.fkBranchId=? and p.purchaseDate BETWEEN ? and ?) as f group by(f.name)",[bid,sd,ed],callback);
     
},
getPurchaseReportBetweenDatePassed:function(sd,ed,callback){
    // return db.query("select f.itemId,f.name, SUM(f.purchaseQuantity) as Quantity,f.fkBranchId,f.branchName from"+
    // " (select i.itemId,i.name,pd.purchaseQuantity,p.fkBranchId,b.branchName from purchasedetails as pd "+
    // "join purchase as p on p.purchaseId=pd.fkpurchaseId join item as i on i.itemId=pd.fkItemId join branch as b on b.branchId=p.fkBranchId"+
    // " where p.purchaseDate BETWEEN ? and ?) as f group by(f.name)",[sd,ed],callback);

    return db.query("select i.name,i.itemId,b.branchId,sum(pd.purchaseQuantity) as Quantity,b.branchName from purchase p ,purchasedetails pd,item i,branch b where p.purchaseId=pd.fkPurchaseId and i.itemId=pd.fkItemId and b.branchId=p.fkBranchId and p.purchaseDate BETWEEN ? and ? group by i.name,b.branchName   ",[sd,ed],callback);

     
},
getSaleReportByDateAndItemPassedBranchId:function(iid,sd,ed,bid,callback){
    

    return db.query("select f.name,f.salesDate,sum(f.saleQuantity) as Quantity from"+
    " (select i.name,s.salesDate,sd.saleQuantity from salesdetails as sd "+
    "join sale as s on s.saleId=sd.fkSaleId join item as i on i.itemId=sd.fkItemId"+
    " where s.fkBranchId=? and sd.fkItemId=? and s.salesDate BETWEEN ? and ?) as f"+
    " group by(f.salesDate)",[bid,iid,sd,ed],callback);
     
},
getSaleReportByDateAndItemPassed:function(iid,sd,ed,callback){
    

    return db.query("select i.name,s.salesDate,sum(sd.saleQuantity) as Quantity,b.*"+
    " from salesdetails as sd join sale as s on s.saleId=sd.fkSaleId "+
    "join item as i on i.itemId=sd.fkItemId join branch as b on b.branchId=s.fkBranchId where sd.fkItemId=? and s.salesDate BETWEEN ? and ? "+
    "group by(s.salesDate)",[iid,sd,ed],callback);
     
},
getPurchaseReportByDateAndItemPassedBranchId:function(itemId,to,from,branchId,callback)
{
  return db.query("select i.name, sum(pd.purchaseQuantity) as 'purchase',"+
  "DATE_FORMAT(p.purchasedate, '%d %m %Y') as 'date' "+
  "from purchasedetails pd join purchase p on p.purchaseId = pd.fkPurchaseId"+
  " join item i on i.itemId = pd.fkItemId join branch b on b.branchId=? "+
  "where fkItemId = ? and p.purchaseDate between ? and ? "+
  "group by p.purchasedate",[branchId,itemId,to,from],callback);       
},
getPurchaseReportByDateAndItemPassed:function(itemId,to,from,callback)
{
  return db.query("select i.name, sum(pd.purchaseQuantity) as 'purchase',b.* "+
  ",DATE_FORMAT(p.purchasedate, '%d %m %Y') as 'date'"+
  " from purchasedetails pd join purchase p on p.purchaseId = pd.fkPurchaseId "+
  "join item i on i.itemId = pd.fkItemId join branch as b on b.branchId=p.fkBranchId where fkItemId = ? and p.purchaseDate between ? and ?"+
  " group by p.purchasedate",[itemId,to,from],callback);       
},
getSaleDetailsByPassingMonth:function(itemId,callback)
      {
          return db.query("select i.name,b.*,sum(sd.saleQuantity) as quantity,"+
          "DATE_FORMAT(sa.salesDate,'%m - %Y') as date from salesdetails sd ,branch b,sale sa,item i "+
          "where b.branchId=sa.fkBranchId and sd.fkSaleId = sa.saleId and sd.fkItemId=i.itemId and i.itemId = ?  and "+
          " MONTH(sa.salesDate) = MONTH(CURRENT_DATE())"+
          "AND YEAR(sa.salesDate) = YEAR(CURRENT_DATE()) group by sd.fkitemId",[itemId],callback);
    },
getSaleDetailsByPassingMonthAndBranchId:function(itemId,branchId,callback)
      {
          return db.query("select i.name,sum(sd.saleQuantity) as quantity,"+
          "DATE_FORMAT(sa.salesDate,'%m - %Y') as date from salesdetails sd ,sale sa,item i,branch b"+
          " where b.branchId = ? and sd.fkSaleId = sa.saleId and sd.fkItemId=i.itemId and i.itemId = ? "+
          " and MONTH(sa.salesDate)=MONTH(CURRENT_DATE())"+
          " AND YEAR(sa.salesDate)= YEAR(CURRENT_DATE()) group by sd.fkItemId",[branchId,itemId],callback);
    },
    getPurchaseDetailsMonthWise:function(itemId,callback)
    {
     return db.query("select i.name,b.*,sum(pd.purchaseQuantity) as quantity,"+
     "DATE_FORMAT(pu.purchaseDate,'%m - %y') as date from purchasedetails pd ,branch b,purchase pu,item i"+
     " where b.branchId=pu.fkBranchId and pd.fkPurchaseId = pu.purchaseId and i.itemId=pd.fkItemId and i.itemId = ?"+
     " and MONTH(pu.purchaseDate)=MONTH(CURRENT_DATE())"+
     " AND YEAR(pu.purchaseDate)= YEAR(CURRENT_DATE()) group by pd.fkItemId",[itemId],callback);       
  },
  getPurchaseDetailsMonthWiseBranch:function(itemId,branchId,callback)
  {
    return db.query("select i.name,sum(pd.purchaseQuantity) as quantity,"+
    "DATE_FORMAT(pu.purchaseDate,'%m - %y') as date from purchasedetails pd ,purchase pu,item i,branch b"+
    " where pd.fkPurchaseId = pu.purchaseId and i.itemId=pd.fkItemId and b.branchId = ? and i.itemId = ? "+
    " and MONTH(pu.purchaseDate)=MONTH(CURRENT_DATE()) "+
    "  AND YEAR(pu.purchaseDate)= YEAR(CURRENT_DATE()) group by date",[branchId,itemId],callback);       
},
stockItemBranchId:function(fk_branchId,callback){
    
return db.query("Select i.name,i.gsm, s.fkitemid as itemId, s.stockquantity as ToatlStock"+
" from item i, stock s where i.itemId =s.fkitemId and s.fkbranchId=? "+
" GROUP BY s.fkItemId",[fk_branchId],callback);
},
saleReportPassingMonthYear:function(m,y,callback){
    return db.query("SELECT s.salesDate, i.name,sd.saleQuantity FROM SALE s JOIN"+
    " salesdetails sd ON s.saleId= sd.fkSaleId  JOIN item i ON i.itemId=sd.fkItemId "+
    "AND MONTH(s.salesDate) = ? AND YEAR(s.salesDate) = ?",[m,y],callback);
  
},
purchaseReportPassingMonthYear: function (m,y,callback) {
    return db.query("SELECT p.purchaseDate, i.name,pd.purchaseQuantity FROM purchase p JOIN"+
    " purchasedetails pd ON p.purchaseId= pd.fkPurchaseId JOIN item i ON i.itemId=pd.fkItemId "+
    "and MONTH(p.purchaseDate) = ? AND YEAR(p.purchaseDate) = ?", [m,y], callback);
},

getChartData: function(callback){
    return db.query(`
        SELECT saleData.month,saleData.year, sum(saleData.totalQuantity) as totalSale
        FROM
            (SELECT DATE_FORMAT(s.salesDate,'%m') as month,DATE_FORMAT(s.salesDate,'%y') as year,
                (SELECT SUM(sd.saleQuantity)
                FROM salesdetails as sd
                WHERE sd.fkSaleId=s.saleId
                ) as totalQuantity
            FROM sale as s
            WHERE DATE_FORMAT(s.salesDate,'%Y%m') <= DATE_FORMAT(CURRENT_DATE,'%Y%m')
            AND DATE_FORMAT(s.salesDate,'%Y%m') >= DATE_FORMAT(DATE_ADD(CURRENT_DATE, INTERVAL -1 YEAR),'%Y%m')
            ORDER BY DATE_FORMAT(s.salesDate,'%m%y') ASC
            ) as saleData
        GROUP BY (saleData.month),(saleData.year)
        ORDER BY saleData.year, saleData.month
    `, callback);
},
getChartDataByBranch: function(bid,callback){
    return db.query(`
        SELECT saleData.branchid,saleData.branchname,saleData.month,saleData.year, sum(saleData.totalQuantity) as totalSale
        FROM
            (SELECT DATE_FORMAT(s.salesDate,'%m') as month,DATE_FORMAT(s.salesDate,'%y') as year,
                (SELECT SUM(sd.saleQuantity)
                FROM salesdetails as sd
                WHERE sd.fkSaleId=s.saleId
                ) as totalQuantity,b.branchId as branchid,b.branchName as branchname
            FROM sale as s,branch as b
            WHERE  DATE_FORMAT(s.salesDate,'%Y%m') <= DATE_FORMAT(CURRENT_DATE,'%Y%m')
            AND DATE_FORMAT(s.salesDate,'%Y%m') >= DATE_FORMAT(DATE_ADD(CURRENT_DATE, INTERVAL -1 YEAR),'%Y%m') and
            s.fkBranchId=b.branchId and b.branchId=?
            ORDER BY DATE_FORMAT(s.salesDate,'%m%y') ASC
            ) as saleData
        GROUP BY (saleData.month),(saleData.year)
        ORDER BY saleData.year, saleData.month
       
    `, [bid],callback);
},
getAllCreditorAmount:function(callback)
{
    return db.query("SELECT s1.customerName, s1.customerEmailId , s1.customerPhoneNo, s1.TotalPendingAmount - s2.TotalPaidAmount as TotalPendingAmount from (select customerName ,customerEmailId, customerPhoneNo,sum(amountDue) as TotalPendingAmount from amountdue as a join customer on fkCustomerEmailId=customerEmailId where a.amountPaid = 0 group by(fkCustomerEmailId) having TotalpendingAmount > 0 )as s1 JOIN (select customerName ,customerEmailId, customerPhoneNo,sum(amountPaid) as TotalPaidAmount from amountdue as a1 join customer on fkCustomerEmailId=customerEmailId group by(fkCustomerEmailId))as s2 where s1.customerName=s2.customerName",callback);
},
getAllCreditorwithlastpaydate:function(callback)
{
    return db.query("select customerName ,customerEmailId, customerPhoneNo,amountDue,transactionDate from amountdue join customer on fkCustomerEmailId=customerEmailId where amountDue > 0",callback);
},
getCreditorByName:function(name,callback){ 
    return db.query("select customerName ,customerEmailId, customerPhoneNo,amountDue,transactionDate from amountdue join customer on fkCustomerEmailId=customerEmailId where amountDue>0 and Customername=?",[name],callback);
    }





};


module.exports=report;
