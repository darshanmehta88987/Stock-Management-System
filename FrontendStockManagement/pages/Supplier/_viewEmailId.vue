<template>
    <viewSupplier :id="supplierEmailId" mode="supplier"></viewSupplier>
</template>

<script>
import viewSupplier from '@/components/csiView';

export default {
    layout:'dashboard',
    components:{
        viewSupplier
    },
    data(){
        return{
            supplierEmailId: this.$route.params.viewEmailId
        }
    }    
}
</script>
