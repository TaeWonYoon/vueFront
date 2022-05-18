<template>
    <div id="comnCodMgr">
        <topNav nav="제품발주,반품" navDetail="발주,반품처리"></topNav>
        <!-- 목록 영역 발주-->
        <purchaseOrderContents></purchaseOrderContents>
        <div style="margin-top:30px;"></div>
        <!-- 목록 영역 반품-->
        <purchaseReturnContents></purchaseReturnContents>
    </div>
    <!-- 페이징 영역 -->
</template>

<script>
import topNav from "./common/topNav.vue";
import purchaseOrderContents from "./components/purchaseOrderContents.vue";
import purchaseReturnContents from "./components/purchaseReturnContents.vue";
export default {
  components: {
    topNav: topNav,
    purchaseOrderContents: purchaseOrderContents,
    purchaseReturnContents: purchaseReturnContents
  },
};
</script>