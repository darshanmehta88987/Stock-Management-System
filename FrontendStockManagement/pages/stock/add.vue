<template>
    <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-left mb-0">Add Stock Usage</h2>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="content-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-content">
                                    <div class="card-body">
                                        <div class="row">
                                                    <div class="col-md-5" >
                                                        <button class="btn btn-primary" type="button" @click="addMan=true,addRep=false"><i class="feather icon-plus"></i> Add Usage</button>
                                                        <button class="btn btn-primary" type="button" @click="addMan=false,addRep=true " data-toggle="modal" data-target="#addReportModal"><i class="feather icon-plus"></i> Generate</button>
                                                    </div>
                                                    <div class="col-md-7"></div>

                                        </div>
                                        <form class="steps-validation wizard-circle" @submit.prevent="addUsage()" v-if="addMan==true && addRep==false"> 
                                        <div class="row form-group" style="margin-top:10px;" >
                                                    <div class="col-md-4" v-if="$store.state.role!='operator'">
                                                        <div class="form-group">
                                                            <label> Branch*</label>
                                                            <select2
                                                                :options="branchList"
                                                                v-model="selectedBranch"
                                                                classes="form-control col-md-12"
                                                            ></select2>
                                                        </div>
                                                    </div>
                                                    <div v-else class="col-md-4">
                                                            <div class="form-group">
                                                            <label>Branch*</label>
                                                            <input type="text" class="form-control" disabled :value="defaultBranch" />
                                                            </div>
                                                        </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label> Item*</label>
                                                            <select2
                                                                :options="itemList"
                                                                v-model="selectedItem"
                                                                classes="form-control col-md-12"    
                                                            ></select2>
                                                        </div>    
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>
                                                                Stock*
                                                            </label>
                                                            <input type="number" min=0 required class="form-control " v-model="stock">
                                                        </div>
                                                    </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-9"></div>
                                            <div class="col-md-3">
                                                        <button style="float:right;" class="btn btn-primary"  type="button" @click="addUsage()"><i class="feather icon-plus"></i> Add</button>
                                            </div>
                                        </div>
                                    </form>        
                                    <div class="row form-group" style="margin-top:10px;" v-if="addMan==false && addRep==true">
                                                        <div class="col-md-4" v-if="$store.state.role!='operator'">
                                                            <div class="form-group">
                                                                <label> Branch*</label>
                                                                <select2
                                                                    :options="branchList"
                                                                    v-model="selectedBranch"
                                                                    classes="form-control col-md-12"
                                                                ></select2>
                                                            </div>
                                                        </div>
                                                        <div v-else class="col-md-4">
                                                            <div class="form-group">
                                                            <label>Branch*</label>
                                                            <input type="text" class="form-control" disabled :value="defaultBranch" />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-8"></div>
                                        </div>
                                                <div v-if="selectedBranch!='' && selectedBranch!=0 && addMan==false && addRep==true" class="row">
                                                    <div class="col-md-12" @drop="_drop" @dragenter="_suppress" @dragover="_suppress" data-sortable-id="form-dropzone-1" style="cursor:pointer" @click="$refs.fileInput.click()">
                                            
                                                                <div class="panel-body text-inverse" >
                                                                    
                                                                    <div>
                                                                        <form>
                                                                            <div class="row">
                                                                                <div class="col-12">
                                                                                    
                                                                                    <h4 class="dropzone-bulk">Drop Your Files <b>Here</b> or <b>Click</b> to Upload</h4>
                                                                                    
                                                                                    <input type="file" ref="fileInput" class="form-control" id="file" style="display:none" :accept="SheetJSFT" @change="_change" />
                                                                                <!--<img src="/img/dropzoneImg.png"/>-->
                                                                                </div>
                                                                                
                                                                                
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    </div>                                        
</template>
<script>
import axios from 'axios';
import select2 from '@/components/select2Component';
var XLSX = require('xlsx')
const _SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

export default{
layout:"dashboard",
created(){
    
},
components:{
    select2
},
data(){
    return{
        SheetJSFT: _SheetJSFT,
        addMan:false,
        addRep:false,
        branchList:[],
        itemList:[],
        selectedBranch:"",
        selectedItem:"",
        stock:0,
        defaultBranch:""
    }
},
watch: {
    addMan: function (val) {
      if(this.addMan==true){
            this.getDetails();
    }
    },
    addRep: function (val) {
      if(this.addRep==true){
            this.getDetails2();
        }
    }
},
beforeUpdate(){
if (this.$store.state.role == "operator") {
      axios
        .get(
          "http://localhost:4000/branch/" + this.$store.state.selectedBranchId
        )
        .then(response => {
          if (response) {
            this.defaultBranch = response.data[0].branchName;
            this.selectedBranch = this.$store.state.selectedBranchId;
          }
        });
    }
},
    methods:{
    getDetails(){
        axios.get('http://localhost:4000/branch').then(res=>{
                const options=[{'id':0 , 'text': 'Select Branch'}];
                for(let index in res.data){
                    options.push({
                        "id": res.data[index].branchId,
                        "text": res.data[index].branchName
                    });
                }
                return options;
            })
            .then(res2=>{
                this.branchList=res2;
                // cosnole.log("AA")
                // //console.log(res2);
            })
            .then(res3=>{
                axios.get('http://localhost:4000/item').then(res=>{
                    const options=[{'id':0 , 'text': 'Select Item'}];
                    for(let index in res.data){
                        options.push({
                            "id": res.data[index].itemId,
                            "text": res.data[index].name
                        });
                    }
                    return options;
                })
                .then(res4=>{
                this.itemList=res4;
                    // //console.log(this.itemList);
            })
            });
    },
    getDetails2(){
        axios.get('http://localhost:4000/branch').then(res=>{
                const options=[{'id':0 , 'text': 'Select Branch'}];
                for(let index in res.data){
                    options.push({
                        "id": res.data[index].branchId,
                        "text": res.data[index].branchName
                    });
                }
                return options;
            })
            .then(res2=>{
                this.branchList=res2;
                // cosnole.log("AA")
                // //console.log(res2);
            });
    },
    addUsage(){
        if(this.selectedBranch==0 || this.selectedItem==0){
            Swal.fire({
                   type: 'error',
                   title: 'Invalid!',
                   text: 'It seems you forgot to select a field',
                   confirmButtonColor:'#4839eb',
                   confirmButtonText: 'Ok'  
              })      
        }
        else if(this.stock == ""){
            Swal.fire({
                   type: 'error',
                   title: 'Invalid quantity!',
                   text: 'Quantity cannot be empty',
                   confirmButtonColor:'#4839eb',
                   confirmButtonText: 'Ok'  
              })
        }
        else if(this.stock <= 0){
            // console.log(this.stock);
            Swal.fire({
                   type: 'error',
                   title: 'Invalid quantity!',
                   text: 'Quantity should be greater than 0',
                   confirmButtonColor:'#4839eb',
                   confirmButtonText: 'Ok'  
              })
        }
        else{
            axios.post('http://localhost:4000/stock/managestock/'+this.selectedItem+"/"+this.selectedBranch,{
                        stockQuantity:this.stock
            })
            .then(res1=>{
                Swal.fire({
                    type: 'success',
                    title: 'Success!',
                    text: 'Usage recorded Successfully.',
                    confirmButtonColor:'#4839eb',
                    confirmButtonText: 'Ok'  
                })
                this.selectedBranch="";
                this.selectedItem="";
                this.stock=0;
                // window.location.reload();
            });  
        }                        
    },
        _suppress(evt) { evt.stopPropagation(); evt.preventDefault(); },
		_drop(evt) {
			evt.stopPropagation(); evt.preventDefault();
			const files = evt.dataTransfer.files;
			if(files && files[0]) this._file(files[0]);
		},
		_change(evt) {
			const files = evt.target.files;
			if(files && files[0]) this._file(files[0]);
		},
		async _file(file) {
			/* Boilerplate to set up FileReader */
			const reader = new FileReader();
			reader.onload = (e) => {
				/* Parse data */
				const bstr = e.target.result;
				const wb = XLSX.read(bstr, {type:'binary'});
				/* Get first worksheet */
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				/* Convert array of arrays */
				const data = XLSX.utils.sheet_to_json(ws, {header:1});
                // //console.log(JSON.stringify(data))
                //var a=[]
                //var j=0;
                let promise = new Promise((resolve,reject)=>{                        
                        //for storing item table's itemId and size
                        let itemId=[];
                        let itemSize=[];
                        //for storing LastUpdateddate of stock table 
                        let lastDate=[];

                        axios.get('http://localhost:4000/item/')
                        .then(response=>{
                            // //console.log(response);
                            for(let i=0;i<response.data.length;i++){
                                itemId.push(response.data[i].itemId);
                                itemSize.push(response.data[i].size);
                            }
                            //console.log("Item id "+itemId);
                            //console.log("Item size"+itemSize);
                        })
                        .then(response1=>{
                        let promise2 = new Promise((resolve2,reject3)=>{
                            let i,ii=0;
                            // //console.log("Called");
                            let mypromise=[];
                            for(i=0;i<itemId.length;i++){
                            // //console.log("Called 1");
                                mypromise.push(axios.get('http://localhost:4000/stock/'+itemId[i]+"/"+this.selectedBranch))
                            }
                                Promise.all(mypromise).then(r=>{
                            // //console.log("Last Update Date= "+lastDate);
                                    for(i=0;i<itemId.length;i++){
                                        // //console.log(r[i]);
                                        lastDate.push(r[i].data[0].lastUpdatedDate);
                                    }
                                    // //console.log("Last Update Date= "+lastDate);
                                    resolve2("1");

                                });
                            
                        });

                            
                           promise2.then((resolve2)=>{
                               if(resolve2=='1'){
                                    let promise3 = new Promise((resolve3,reject3)=>{
                                        Swal.fire({                     // loading animation
                                            title: 'Processing Records !',
                                            text: 'Wait while all records are being processed',
                                            allowEscapeKey: false,
                                            allowOutsideClick: false,
                                            onOpen: () => {
                                                Swal.showLoading();
                                            }           
                                            });
                                        

                                    //for storing csv entries:-
                                        let itemSizeName=[];
                                        let itemRecords=[];
                                        
                                        let fileRead=-1;
                                        for(let i=1;i<data.length;i++)
                                            {   
                                                // //console.log(data[i][4]);
                                                if(data[i][9]!=undefined){

                                                        //wil use print start date to compare but will store print end date in db
                                                        //utc1 holds printstartdate and utc11 holds print end date
                                                            let utc1=new Date((data[i][13] - (25567 + 2))*86400*1000);
                                                            utc1.setHours(utc1.getHours()- 5);
                                                            utc1.setMinutes(utc1.getMinutes() - 30);
                                                            utc1.setSeconds(0);
                                                        let utc11=new Date((data[i][14] - (25567 + 2))*86400*1000);
                                                            utc11.setHours(utc11.getHours()- 5);
                                                            utc11.setMinutes(utc11.getMinutes() - 30);
                                                            utc11.setSeconds(0);    

                                                            // when we store date in mysql it automatically minus 5 hours and 30 minutes from date value inserted
                                                            //so we have to convert it back to correct time
                                                        let utc2=new Date(lastDate[itemSize.indexOf(data[i][15])])
                                                            utc2.setHours(utc2.getHours() + 5);
                                                            utc2.setMinutes(utc2.getMinutes() + 30);
                                                            utc2.setSeconds(0);
                                                            //console.log("DB Date= "+utc2);
                                                            //console.log("File Date= "+utc1);
                                                            // let d=utc1>utc2?"DB Date is greater":"File Date Is greater"
                                                    if(lastDate[itemSize.indexOf(data[i][15])]==null || utc2 < utc1){
                                                        fileRead=1;
                                                        //console.log("Inside fileRead");
                                                        if(itemSizeName.indexOf(data[i][15])==-1){      //to check if item size is not already present in itemSizeName
                                                            itemSizeName.push(data[i][15]);
                                                            itemRecords.push({
                                                                size:data[i][15],
                                                                stock:data[i][9],
                                                                maxDate:utc11
                                                            });
                                                        }   
                                                        else{
                                                            itemRecords[itemSizeName.indexOf(data[i][15])].stock+=data[i][9];
                                                        }
                                                    }
                                                }
                                            }
                                            //console.log(itemSizeName);
                                            // console.log(itemRecords);
                                        if(fileRead!=-1){
                                                    
                                                let stockUsage=[];
                                                let j;
                                            for(j=0;j<itemRecords.length;j++){
                                                // console.log(itemRecords[j].size);
                                                // console.log(itemId[itemSize.indexOf(itemRecords[j].size)]);
                                                    stockUsage.push({
                                                        fkItemId:itemId[itemSize.indexOf(itemRecords[j].size)],
                                                        fkBranchId:this.selectedBranch,
                                                        stockQuantity:itemRecords[j].stock,
                                                        status:0,
                                                        maxDate:itemRecords[j].maxDate
                                                    });
                                            }
                                            // console.log(stockUsage);
                                            if(j==itemRecords.length){
                                                resolve3(stockUsage);
                                            }
                                        }
                                        else{
                                                Swal.DismissReason.backdrop,                    
                                                Swal.fire({
                                                    type: 'error',
                                                    title: 'Oops...',
                                                    text: 'Records of this file Already recorded!',
                                                    confirmButtonColor:'red',
                                                    confirmButtonText: 'Ok',  
                                                    onOpen: () => {
                                                        Swal.hideLoading();
                                                    }
                                                })
   
                                                                             
                                        }
                                        // alert("File Data already Processed and recorded");
                                        // return stockUsage;
                                        });
                                        promise3.then((resolve3)=>{
                                            if(resolve3!=null){ 
                                                    let stockUsage2=resolve3;
                                                    let k;
                                                    let mypromise2=[];
                                                    for(k=0;k<stockUsage2.length;k++){
                                                        // //console.log("Called");
                                                        mypromise2.push(axios.post('http://localhost:4000/stock/managestock/'+stockUsage2[k].fkItemId+"/"+stockUsage2[k].fkBranchId,{
                                                            stockQuantity:stockUsage2[k].stockQuantity,
                                                            lastUpdatedDate:stockUsage2[k].maxDate
                                                        })
                                                        )
                                                        // console.log("Item Id= "+stockUsage2[k].fkItemId);
                                                    }
                                                    Promise.all(mypromise2).then(r=>{
                                                            let isErr=0;
                                                            for(let l=0;l<stockUsage2.length;l++){
                                                                if(r[l].data=="Done"){
                                                                    isErr++;
                                                                }
                                                                else{
                                                                    break;
                                                                }
                                                            }
                                                            if(isErr==stockUsage2.length){
    
                                                                // let totalStock=0;
                                                                // let m;
                                                                // for(m=0;m<stockUsage2.length;m++){
                                                                //     totalStock+=stockUsage2[m].stockQuantity;
                                                                // }
                                                                // if(m==stockUsage2.length){
                                                                    let dd=new Date();
                                                                    // d.setHours(d.getHours + 5);
                                                                    // d.setMinutes(d.getMinutes + 30);
                                                                    // console.log(dd);
                                                                    // console.log(totalStock);
                                                                    axios.post('http://localhost:4000/Sale/cashTally',{
                                                                        branchId:this.selectedBranch,
                                                                        stockUsage: stockUsage2
                                                                    })
                                                                    .then(response=>{
                                                                            axios.post('http://localhost:4000/Sale/',{
                                                                                // saleId: idTimeStamp,
                                                                                salesDate:dd,
                                                                                isInvoiceGenerated: 0,
                                                                                fkCustomerEmailId:null,
                                                                                fkSaleTypeId: "4d0666c5-7274-11ea-b720-588a5a24e720",
                                                                                fkBranchId: this.selectedBranch
                                                                            }).then(response1=>{
                                                                                if(response1){
                                                                                    Swal.fire(
                                                                                        'Recorded !',
                                                                                        'All Records Recorded Successfully.',
                                                                                        'success'
                                                                                    );
                                                                                    location.reload();
                                                                                }
                                                                            });
                                                                    });
                                                                // }

                                                                // alert("All Records Recorded");
                                                            }
                                                            else{
                                                                // alert("Some Error Occured.Please Re upload File");
                                                            }
                                                        });    
                                                    // }
                                                    // if(kk==stockUsage2.length){
                                                    //     alert("All Records Recorded");
                                                    // }
                                                    
                                           }                                                    
                                        });
                               }    
                           });
                        });    
                });
                promise.then((resolve)=>{
                    if(resolve=="1"){
                    }
                });
                promise.catch((rej)=>{
                    
                });
			};
			reader.readAsBinaryString(file);
		}

}
}
</script>