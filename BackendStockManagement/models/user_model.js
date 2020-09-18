var db=require('../dbconnec'); //reference of dbconnection.js
 
var User={
 
getLogin:function(item,callback){
                // console.log(item);
        return db.query("Select * from user where userEmailId=? And userPassword=?",[item.userEmailId,item.userPassword],callback);
                   
},
        
GetAllUser:function(callback){
 
// return db.query("Select * from User",callback);
return db.query("select * from User join branch on (User.fkBranchId=branch.branchId)",callback);    

} ,
GetAllUserById:function(user_emailId,callback){
 
        return db.query("select * from User join branch on (User.fkBranchId=branch.branchId) and userEmailId=?",[user_emailId],callback);
        } ,
        
AddUser:function(item,callback){
            return db.query("insert into User(userEmailId,userName,userPassword,userAddress,userPhoneNo,fkRoleId,fkBranchId) values(?,?,?,?,?,?,?)",[item.userEmailId,item.userName,item.userPassword,item.userAddress,item.userPhoneNo,item.fkRoleId,item.fkBranchId],callback);
    },
    
    UpdateUser:function(id,item,callback){
             return db.query("update User set userName=?,userPassword=?,userAddress=?,userPhoneNo=?,fkRoleId=?,fkBranchId=? where userEmailId=?",[item.userName,item.userPassword,item.userAddress,item.userPhoneNo,item.fkRoleId,item.fkBranchId,id],callback)
    },

    DeleteUser:function(id,callback){
       
            return db.query("delete from User where userEmailId in (?)",[id],callback);
      } ,
     

      changePassword:function(item,callback){
        return db.query("update User set userPassword=? where userEmailId=?",[item.userPassword,item.userEmailId],callback);
    },
    getuserbybranchid:function(id,callback){
        return db.query("select * from User where fkBranchId=?",[id],callback);
     }
  
}
 module.exports=User;
