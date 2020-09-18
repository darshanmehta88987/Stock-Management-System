<template>
    <viewUser :id="userEmailId" mode="user"></viewUser>
</template>

<script>
import viewUser from '@/components/csiView';

export default {
    layout:'dashboard',
    components:{
        viewUser
    },
    data(){
        return{
            userEmailId: this.$route.params.viewEmailId
        }
    }    
}
</script>
