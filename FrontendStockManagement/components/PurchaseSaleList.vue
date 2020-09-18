<template>
    <span >
        <button type="button"  v-if="selectedItems.length > 0" class="btn btn-danger" @click="deleteRec('multiple')"><i class="feather icon-trash-2"></i> Delete </button>

        <div class="table-responsive">

            <table class="table table-striped dataex-html5-selectors dataTable">    
                <thead>
                    <tr>
                        <!-- <th></th> -->
                        <th>Sr.No</th>
                        <th v-if="mode=='sale'">Customer Name</th>
                        <th v-else>Supplier Name</th>
                        <th>Phone No.</th>
                        <th>Email</th>
                        <th v-if="mode=='sale'">Sales Date</th>
                        <th v-else>Purchase Date</th>
                        <th v-if="$store.state.selectedBranchId==100">Branch</th>
                        <th>Actions</th>
                    </tr>           
                </thead>
                <tbody> 
                    <tr v-for="(object,index) in fetchedObjects" :key="index">
                        <!-- <td v-if="mode=='sale'"><input type="checkbox" v-model="selectedItems" :value="object.saleId"></td> -->
                        <!-- <td v-else><input type="checkbox" v-model="selectedItems" :value="object.purchaseId"></td> -->
                        <td>{{ index + 1 }}</td>
                        <td v-if="mode=='sale'">{{ object.customerName }}</td>
                        <td v-else> {{ object.supplierName }} </td>

                        <td v-if="mode=='sale'">{{ object.customerPhoneNo }}</td>
                        <td v-else> {{ object.supplierPhoneNo }} </td>

                        <td v-if="mode=='sale'">{{ object.customerEmailId }}</td>
                        <td v-else> {{ object.supplierEmailId }} </td>
                                                                    
                        <td v-if="mode=='sale'"> {{ object.salesDate | filterDateFormat }} </td>
                        <td v-else> {{ object.purchaseDate | filterDateFormat }} </td>

                        <td v-if="$store.state.selectedBranchId==100"> {{ object.branchName }} </td>

                        <td v-if="mode=='sale'">
                            <!-- view button -->
                            <button title="View this sale" @click="viewSale(object.saleId)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button title="Edit this sale" class="btn btn-warning" @click="updateSale(object.saleId)"><i class="feather icon-edit"></i></button>
                            <!-- delete button - red color -->
                            <button title="Delete this sale" class="btn btn-danger" @click="deleteRec(object.saleId)"><i class="feather icon-trash-2"></i></button>
                        </td>
                        <td v-else>
                            <!-- view button -->
                            <button title="View this purchase" @click="viewPurchase(object.purchaseId)"  class="btn btn-primary">
                                <i class="feather icon-list"></i>
                            </button>
                            <!-- edit button - yellow color -->
                            <button title="Edit this purchase" class="btn btn-warning" @click="updatePurchase(object.purchaseId)"><i class="feather icon-edit"></i></button>
                            <!-- delete button - red color -->
                            <button title="Delete this purchase" class="btn btn-danger" @click="deleteRec(object.purchaseId)"><i class="feather icon-trash-2"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </span>            
</template>
<script>
import axios from 'axios'

export default {
    props:{
        mode:{
            type: String,
            required: true
        }
    },
    data(){
        return{
            selectedItems:[],
            fetchedObjects: null,
            id:"",
            myBranch:""
        }
    },  
        computed:{
        getBranch(){
            return this.$store.state.selectedBranchId;
        }
    },
     watch:{
        getBranch:function(val){
            this.myBranch=val;
            // console.log("csiList= "+this.myBranch); 
            this.getDetails();
        },
     },
    created(){
        this.getDetails();        
    },
    filters:{
        filterDateFormat(val){
            let date = new Date(val);
            date.setHours(date.getHours()+6);
            return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() ;
        }
    },
    methods:{
        viewSale(id){
            this.$router.push('/sale/'+id);
        },
        viewPurchase(id){
            this.$router.push('/purchase/'+id);
        },
        updateSale(id){
            this.$router.push('/sale/edit/'+id);
        },
        updatePurchase(id){
            this.$router.push('/purchase/edit/'+id);
        },
        deleteRec(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    if(id == 'multiple'){
                        axios.post('http://localhost:4000/'+this.mode+"/deleteMultiple",this.selectedItems)
                        .then(res=>{
                            if(res.data.affectedRows){
                                Swal.DismissReason.backdrop,
                                    Swal.fire({
                                            type: 'success',
                                            title: 'Success!',
                                            text: 'Record Deleted Successfully.',
                                            confirmButtonColor:'#4839eb',
                                            confirmButtonText: 'Ok'  
                                            });
                                            this.getDetails();
                                            this.selectedItems=[];
                                            
                            }
                            else{
                                Swal.DismissReason.backdrop,
                                    Swal.fire({
                                            type: 'error',
                                            title: 'Oops...',
                                            text: 'Cannot Delete Record!',
                                            confirmButtonColor:'red',
                                            confirmButtonText: 'Ok'  
                                            })
                            }
                        });
                    }
                    else{
                        axios.delete('http://localhost:4000/'+this.mode+"/"+id)
                        .then(res=>{
                            if(res.data.affectedRows){
                                Swal.DismissReason.backdrop,
                                    Swal.fire({
                                            type: 'success',
                                            title: 'Success!',
                                            text: 'Record Deleted Successfully.',
                                            confirmButtonColor:'#4839eb',
                                            confirmButtonText: 'Ok'  
                                            });
                                            this.getDetails();
                            }
                            else{
                                Swal.DismissReason.backdrop,
                                    Swal.fire({
                                            type: 'error',
                                            title: 'Oops...',
                                            text: 'Cannot Delete Record!',
                                            confirmButtonColor:'red',
                                            confirmButtonText: 'Ok'  
                                            })
                            }
                        });
                    }    
                }
            })
        },
        getDetails(){
            if(this.mode=="sale")
            {   
                if(this.$store.state.selectedBranchId==100){
                    axios.get('http://localhost:4000/sale')
                    .then(response => {
                        this.fetchedObjects = response.data;
                    });
                }
                else{
                    if(this.$store.state.selectedBranchId==""){
                        axios.get("http://localhost:4000/user/"+this.$store.state.user)
                        .then(res=>{
                            axios.get('http://localhost:4000/salebybranchid/'+res.data[0].fkBranchId)
                            .then(response => {
                                this.fetchedObjects = response.data;
                            });
                        })
                    }
                    else{
                        axios.get('http://localhost:4000/salebybranchid/'+this.$store.state.selectedBranchId)
                        .then(response => {
                            this.fetchedObjects = response.data;
                        });
                    }
                }
            }
            else
            {
                if(this.$store.state.selectedBranchId==100){
                    axios.get('http://localhost:4000/purchase')
                    .then(response => {
                        this.fetchedObjects = response.data;
                    });
                }
                else{
                    if(this.$store.state.selectedBranchId==""){
                        axios.get("http://localhost:4000/user/"+this.$store.state.user)
                        .then(res=>{
                            axios.get('http://localhost:4000/purchasebybranchid/'+res.data[0].fkBranchId)
                            .then(response => {
                                this.fetchedObjects = response.data;
                            });
                        })
                    }
                    else{
                        axios.get('http://localhost:4000/purchasebybranchid/'+this.$store.state.selectedBranchId)
                        .then(response => {
                            this.fetchedObjects = response.data;
                        });
                    }
                }                
            }
        }
    }
}
</script>
<style scoped>
button{
    padding: 10px 12px;
}
</style>