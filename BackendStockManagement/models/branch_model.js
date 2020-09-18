var db=require('../dbconnec'); 
const uuid=require("uuid-random"); 
 
var branch={
    addBranch:function(item,callback)
    {
             
            let u=uuid();
           
        let promise= new Promise((resolve, reject) => {
            console.log(item);
            let d=db.query('insert into branch (branchId,branchName,branchAddress,branchPhoneNo,gstNumber) values(?,?,?,?,?)',[u,item.branchName,item.branchAddress,item.branchPhoneNo,item.gstNumber]);
            console.log(d); 
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
getAllBranch:function(callback)
{
    return db.query("select * from branch",callback);
},
getBranchByid:function(id,callback){
 
    return db.query("select * from branch where branchId=?",[id],callback);
     
},
getBranchByName:function(name,callback){ 
    // console.log("Called");
    return db.query("select branchName from branch where branchName=?",[name],callback);     
},
updateBranch:function(id,item,callback){

    return db.query("update branch set branchName=?,branchAddress=?,branchPhoneNo=?,gstNumber=? where branchId=?",[item.branchName,item.branchAddress,item.branchPhoneNo,item.gstNumber,item.branchId],callback);
},
deleteBranch:function(id,callback){
    return db.query("delete from branch where branchId=?",[id],callback);
}



};


module.exports=branch;
