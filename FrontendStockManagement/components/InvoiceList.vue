<template>
   <div class="content-wrapper">
        <div class="content-header row">
            <div class="content-header-left col-md-12 col-12 mb-2">
                <div class="row breadcrumbs-top">
                    <div class="col-12">
                        <h2 class="content-header-title float-left mb-0">Generated Invoices</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-body">
            <div class="card">
                <div class="card-body col-md-5">
                    <table class="table table-bordered">
                        <thead>
                            <th>Sr. No</th>
                            <th>Issue Date</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in fetchedRecords" :key="index">
                                <td>{{index+1}}</td>
                                <td> {{ item.invoiceDate | filterDateFormat }}</td>
                                <td><a :href="'http://localhost:4000/invoiceupload/'+item.invoiceName"> <i class="feather icon-download"></i>  Download </a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
import axios from 'axios'

export default {
    props:{
        id:{
            type: String,
            required: true
        }
    },
    data(){
        return{
            fetchedRecords: []
        }
    },
    mounted(){
        axios.get('http://localhost:4000/invoice/'+this.id)
        .then(response=>{
            this.fetchedRecords = response.data;
        });
    },
    filters: {
        filterDateFormat(val){
            let date = new Date(val);
            date.setHours(date.getHours()+6);
            return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() ;
        },
    }
}
</script>