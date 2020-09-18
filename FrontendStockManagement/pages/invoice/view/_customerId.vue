<template>
    <invoice :id="customerId"></invoice>
</template>

<script>
import invoice from '@/components/InvoiceList';

export default {
    layout:'dashboard',
    components:{
        invoice
    },
    data(){
        return{
            customerId: this.$route.params.customerId
        }
    }    
}
</script>
