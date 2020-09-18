<template>
    <addComponent mode="item" :id="$route.params.edit"/>
</template>
<script>
import addComponent from "@/components/csiAdd";

export default {
    layout:"dashboard",
    components:{
        addComponent
    }    
}
</script>
