<template>
    <editPurchase mode="purchase" :id="$route.params.edit"/>
</template>
<script>
import editPurchase from "@/components/PurchaseSale";

export default {
    layout:"dashboard",
    components:{
        editPurchase
    }    
}
</script>