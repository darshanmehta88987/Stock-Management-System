<template>
    <viewItem :id="itemId" mode="item"></viewItem>
</template>

<script>
import viewItem from '@/components/csiView';

export default {
    layout:'dashboard',
    components:{
        viewItem
    },
    data(){
        return{
            itemId: this.$route.params.viewItemId
        }
    }    
}
</script>
