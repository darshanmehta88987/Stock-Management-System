<template>
    <viewSale :id="saleId" mode="sale"></viewSale>
</template>

<script>
import viewSale from '@/components/PurchaseSaleView';

export default {
    layout:'dashboard',
    components:{
        viewSale
    },
    data(){
        return{
            saleId: this.$route.params.saleId
        }
    }    
}
</script>
