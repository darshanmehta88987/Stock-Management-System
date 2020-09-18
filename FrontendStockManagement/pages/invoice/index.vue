<template>
<div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-left mb-0">Invoice</h2>
                        </div>
                    </div>
                </div>
               
            </div>
            <iInvoice></iInvoice>
        </div>
</template>
<script>
import iInvoice from "@/components/InvoiceView";
export default {
    layout:"dashboard",
    components:{
        iInvoice
    },
    methods:{
    
    }
}
</script>
