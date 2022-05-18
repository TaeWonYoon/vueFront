<template>
  <div id="comnCodMgr">
    <topNav nav="기업고객" navDetail="배송지시서"></topNav>
    <!-- 목록 영역 -->
    <deliveryBuyerContents></deliveryBuyerContents>
    
    <!-- 페이징 영역 -->
  </div>
  <!-- //content 영역 -->
</template>

<script>
//import Paginate from "vuejs-paginate-next";

import topNav from "./common/topNav.vue";
import deliveryBuyerContents from "./components/deliveryBuyerContents.vue";
export default {
  data: function () {
    return {
    };
  },
  components: {
    topNav: topNav,
    deliveryBuyerContents : deliveryBuyerContents,
    // paginate: Paginate,
  },
};
</script>