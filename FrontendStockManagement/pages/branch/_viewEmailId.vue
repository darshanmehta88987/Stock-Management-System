<template>
    <viewBranch :id="branchEmailId" mode="branch"></viewBranch>
</template>

<script>
import viewBranch from '@/components/csiView';

export default {
    layout:'dashboard',
    components:{
        viewBranch
    },
    data(){
        return{
            branchEmailId: this.$route.params.viewEmailId
        }
    }    
}
</script>
