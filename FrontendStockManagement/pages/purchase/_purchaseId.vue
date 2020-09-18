<template>
    <viewPurchase :id="purchaseId" mode="purchase"></viewPurchase>
</template>

<script>
import viewPurchase from '@/components/PurchaseSaleView';

export default {
    layout:'dashboard',
    components:{
        viewPurchase
    },
    data(){
        return{
            purchaseId: this.$route.params.purchaseId
        }
    }    
}
</script>
