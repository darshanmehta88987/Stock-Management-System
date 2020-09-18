<template>
    <div class="content-wrapper">
        <div class="content-header row">
            <div class="content-header-left col-md-12 col-12 mb-2">
                <div class="row breadcrumbs-top">
                    <div class="col-12">
                        <h2 class="content-header-title float-left mb-0">View {{mode|capitalize}}</h2>
                        <button style="float:right" class="btn btn-primary" @click="gotoListView">
                            <i class="feather icon-list"></i> List All {{ mode | capitalize }}s
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-body">
            <!-- Form wizard with step validation section start -->
            <section id="validation">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <fieldset>
                                        <div class="col-md-12 col-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    <table cellspacing="10" cellpadding="10">
                                                        <tr>
                                                            <td v-if="mode=='sale'" class="font-weight-bold"> Customer Name</td>
                                                            <td v-else class="font-weight-bold"> Supplier Name</td>
                                                            <td v-if="mode=='sale'"> {{ fetchedData.customerName }} </td>
                                                            <td v-else> {{ fetchedData.supplierName }} </td>
                                                            <button v-if="mode=='sale'" @click="viewCustomer" style="float:right;" class="btn btn-primary">
                                                                <i class="feather icon-user"></i>  View Customer
                                                            </button>
                                                            <button v-else @click="viewSupplier" style="float:right;" class="btn btn-primary">
                                                                <i class="feather icon-user"></i>  View Supplier
                                                            </button>
                                                        </tr>
                                                        <tr>
                                                            <td v-if="mode=='sale'" class="font-weight-bold"> Customer Phone No. </td>
                                                            <td v-else class="font-weight-bold"> Supplier Phone No. </td>
                                                            <td v-if="mode=='sale'"> {{ fetchedData.customerPhoneNo }} </td>
                                                            <td v-else> {{ fetchedData.supplierPhoneNo }} </td>
                                                        </tr>
                                                        
                                                        <tr v-if="mode=='sale'">
                                                            <td class="font-weight-bold">Sale Date</td>
                                                            <td> {{ fetchedData.salesDate | filterDateFormat }} </td>
                                                        </tr>
                                                        <tr v-else>
                                                            <td class="font-weight-bold">Purchase Date</td>
                                                            <td> {{ fetchedData.purchaseDate | filterDateFormat }} </td>
                                                        </tr>
                                                        <tr v-if="mode=='sale'">
                                                            <td class="font-weight-bold">Sale Type</td>
                                                            <td> {{ saleType | capitalize}} </td>
                                                        </tr>

                                                        <tr>
                                                            <td class="font-weight-bold">Branch</td>
                                                            <td> {{ fetchedData.branchName }} </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    
                                    <fieldset>
                                        <div class="col-md-12 col-12">
                                            <div class="card">
                                                <div class="card-header">
                                                    <div class="card-title mb-2">Items List</div>
                                                </div>
                                                <div class="card-body">
                                                    <table class="table-secondary" cellspacing="10" cellpadding="10">
                                                        <tr>
                                                            <td class="font-weight-bold">Sr.No</td>
                                                            <td class="font-weight-bold">Item Name</td>
                                                            <td class="font-weight-bold">GSM</td>
                                                            <td class="font-weight-bold">Size</td>
                                                            <td class="font-weight-bold">Quantity</td>
                                                        </tr>
                                                        <tr v-for="(item,index) in items" :key="index+1">
                                                            <td> {{index+1}} </td>
                                                            <td> {{ item.name }} </td>
                                                            <td v-if="item.gsm==null"> - </td>
                                                            <td v-else> {{ item.gsm }} </td>
                                                            <td v-if="item.size==null"> - </td>
                                                            <td v-else> {{ item.size }} </td>
                                                            <td v-if="mode=='sale'"> {{ item.saleQuantity }} </td>
                                                            <td v-else> {{ item.purchaseQuantity }} </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <div class="row">
                                            <div class="col-md-9 col-4"></div>
                                            <div class="col-md-3 col-8" >
                                                <button @click="gotoEdit()" style="float:right;" class="btn btn-primary">
                                                    <i class="feather icon-edit-2"></i> Edit {{ mode | capitalize }}
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>
                                        <!-- Step 3 -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Form wizard with step validation section end -->

        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    props: {
        id:{
            required:false
        },
        mode:{
            type: String,
            required: true
        }
    },
    data(){
        return{
            fetchedData:[],
            items:[],
            saleType:"Dummy"
        }
    },
    methods:{
        viewCustomer(){
            this.$router.push('/customer/'+this.fetchedData.customerEmailId);
        },
        viewSupplier(){
            this.$router.push('/supplier/'+this.fetchedData.supplierEmailId);
        },
        gotoEdit(){
            this.$router.push( '/' + this.mode + '/edit/' + this.id );
        },
        gotoListView(){
            this.$router.push( '/' + this.mode);
        }
    },
    mounted(){
        if(this.mode=='sale')
        {
            console.log(this.$props.id);
            axios.get('http://localhost:4000/sale/' + this.$props.id)
            .then(Response=>{  
                console.log(Response);
                this.fetchedData = Response.data[0];
                axios.get('http://localhost:4000/saleType/'+this.fetchedData.fkSaleTypeId)
                .then(Response=>{
                    this.saleType = Response.data[0].saleType;
                });
                axios.get('http://localhost:4000/saleDetail_item/'+this.$props.id)
                .then(Response=>{
                    this.items = Response.data;
                })
            });
        }
        else
        {   
            axios.get('http://localhost:4000/purchase/' + this.$props.id)
            .then(Response=>{  
                console.log(Response);
                this.fetchedData = Response.data[0];
                axios.get('http://localhost:4000/purchaseDetail_item/'+this.$props.id)
                .then(Response=>{
                    console.log(Response);
                    this.items = Response.data;
                });
            });
        }
        
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
        filterDateFormat(val){
            let date = new Date(val);
            date.setHours(date.getHours()+6);
            return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() ;
        }
    }
}
</script>
