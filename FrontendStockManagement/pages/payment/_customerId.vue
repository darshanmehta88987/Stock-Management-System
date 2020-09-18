<template>
    <payment :id="customerId"></payment>
</template>

<script>
import payment from '@/components/Payment';

export default {
    layout:'dashboard',
    components:{
        payment
    },
    data(){
        return{
            customerId: this.$route.params.customerId
        }
    }    
}
</script>
