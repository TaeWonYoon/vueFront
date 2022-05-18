<template>
    <!-- 상단네비 -->
    <topNav nav="기업고객" navDetail="반품 지시서"></topNav>
    <!--컨텐트-->
    <refundBuyerContents></refundBuyerContents>
</template>

<script>
import topNav from "./common/topNav.vue";
import refundBuyerContents from "./components/refundBuyerContents.vue";


export default {
  components: {
    topNav: topNav,
    refundBuyerContents: refundBuyerContents
  },
};
</script>