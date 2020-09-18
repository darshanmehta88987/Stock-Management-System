<template>
    <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-left mb-0">Sales</h2>
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
                                                    <div class="col-md-9"></div>
                                                    <div class="col-md-3 col-10" >
                                                        <div class="form-group">
                                                            <button style="float:right;" class="btn btn-primary" @click="add()" type="submit">
                                                                <i class="feather icon-plus"></i>
                                                                Add Sale
                                                            </button>
                                                        </div>
                                                    </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 col-12" >
                                                <saleList mode="sale" />
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
import saleList from "@/components/PurchaseSaleList";
export default {

    layout:"dashboard",
    components:{
        saleList
    },
    methods:{
        add(){
            this.$router.push("/sale/add")
        }
    }
}
</script>
<style scoped>
    button{
        margin-bottom:10px;
    }
</style>