<template>
    <addComponent mode="supplier" :id="$route.params.edit"/>
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
