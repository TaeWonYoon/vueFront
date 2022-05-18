<template>
    <component :is="isSelected"></component>
</template>


<script>
import { defineAsyncComponent } from '@vue/runtime-core';

export default{
    
    props:{'type':String,'menu':String},
    data:function(){
        return{}
    },
    computed:{
        isSelected(){
            let firstChar=this.menu.substring(0,1).toUpperCase();
            let capitalized=firstChar+this.menu.substr(1);            
            return capitalized
        }
    },
    components:{
        // 1. generally expression
        // MenuContent : defineAsyncComponent(()=>import('./scm/productMng.vue'))

        // 2. try function(){} to use this via data
        // MenuContent: defineAsyncComponent(function(){
        //     return import('./scm/productMng.vue')
        // }) 
        //successed

        // 3. try function(){} using this via data
        // MenuContent: defineAsyncComponent(function(){
        //     return import('./'+this.type+'/'+this.menu+'.vue');
        // }) 
        // failed ( cant ref using "this" keyword )

        // 4. define all Menu Component using defineAsyncComponent
        Home :defineAsyncComponent(()=>import('@/views/Home.vue')),
        ProductMng : defineAsyncComponent(()=>import('@/views/scm/productMng.vue')),
        Whinfo : defineAsyncComponent(()=>import('@/views/scm/whinfo.vue')),
        DeliveryBuyer:defineAsyncComponent(()=>import('@/views/dlm/deliveryBuyer.vue')),
        RefundBuyer:defineAsyncComponent(()=>import('@/views/dlm/refundBuyer.vue')),
        Purchaseorder:defineAsyncComponent(()=>import('@/views/dlm/purchaseorder.vue')),
       
    },
    
    
}
</script>