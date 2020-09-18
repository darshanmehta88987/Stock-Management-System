<template>
    <editSale mode="sale" :id="$route.params.edit"/>
</template>
<script>
import editSale from "@/components/PurchaseSale";

export default {
    layout:"dashboard",
    components:{
        editSale
    }    
}
</script>