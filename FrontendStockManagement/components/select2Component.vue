<template>
    <select :class="classes">
        <slot></slot>
    </select>
</template>

<script>

export default {
    props:[
        'options',
        'value',
        'classes',
        'isPassingOptions'
    ],
    mounted(){
        const vm = this;
        $(this.$el)
            .select2({data: this.options})
            .val(this.value)
            .trigger("change")
            .on("change",function(){
                vm.$emit("input",this.value);
            });
    },
    watch:{
        value: function(value){
            $(this.$el)
                .val(value)
                .trigger("change");
        },
        options:function(options){
            if(this.isPassingOptions){
                $(this.$el).select2();
            }
            else{
                $(this.$el)
                .empty()
                .select2({data: options});   
            }
        }
    },
    destroyed(){
        $(this.$el)
            .off()
            .select2("destroy");
    }
}
</script>