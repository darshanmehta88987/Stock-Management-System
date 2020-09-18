<template>
    <viewCustomer :id="customerEmailId" mode="customer"></viewCustomer>
</template>

<script>
import viewCustomer from '@/components/csiView';

export default {
    layout:'dashboard',
    components:{
        viewCustomer
    },
    data(){
        return{
            customerEmailId: this.$route.params.viewEmailId
        }
    }    
}
</script>
