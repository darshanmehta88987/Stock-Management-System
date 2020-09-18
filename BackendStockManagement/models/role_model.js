var db=require('../dbconnec'); //reference of dbconnection.js
 
var Role={
 
getAllRole:function(callback){
 
return db.query("Select * from Role",callback);
},
getAllRoleById:function(roleId,callback){
 
    return db.query("Select * from Role where roleId=?",[roleId],callback);
  },
    
AddRole:function(item,callback){
    return db.query("insert into Role(roleId,roleName) values(?,?)",[item.roleId,item.roleName],callback);
},

UpdateRole:function(id,item,callback){
     return db.query("update Role set roleName=? where roleId=?",[item.roleName,id],callback)
},

DeleteRole:function(id,callback){

    return db.query("delete from Role where roleId in (?)",[id],callback);
} 


}
 module.exports=Role;
