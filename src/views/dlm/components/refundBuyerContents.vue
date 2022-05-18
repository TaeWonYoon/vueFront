<template>
  <div id="comnCodMgr">

    <!--검색 바 테이블 -->
    <table
      style="margin-top: 10px; collapse; border: 1px #50bcdf;"
      width="100%"
      cellpadding="5"
      cellspacing="0"
      border="1"
      align="left"
    >
      <tr style="border: 0px; border-color: blue">
        <td width="40" height="25" style="font-size: 120%">&nbsp;</td>
        <td width="*" height="25" style="font-size: 100%; text-align: center">
          <!-- search name -->
          <input
            type="text"
            style="width: 150px; height: 25px"
            v-model="sname"
            placeholder="고객명 입력"
          />
          &nbsp;&nbsp;&nbsp;
          <!-- calendar date -->
          <input
            type="radio"
            value="all"
            v-model="radio_cal"
            @change="rchange"
          /><label for="radio_cal1">전체</label>
          <input
            type="radio"
            value="choice"
            v-model="radio_cal"
            @change="rchange"
          /><label for="radio_cal2">선택</label>
          <input
            type="date"
            v-model="cal1"
            v-show="radioshow"
            style="height: 25px"
          />
          <input
            type="date"
            v-model="cal2"
            v-show="radioshow"
            style="height: 25px"
          />
          <!-- button -->
          <a
            class="btnType blue"
            @click="listsearch('1')"
            ><span>검색</span></a
          >&nbsp;
        </td>
        <td width="40" height="25" style="font-size: 120%">&nbsp;</td>
      </tr>
    </table>
    <!--//검색 바 테이블 -->

    <!-- 리스트 테이블 영역 -->
    <table class="col">
      <caption>
        caption
      </caption>
      <colgroup>
        <col width="6%" />
        <col width="7%" />
        <col width="*%" />
        <col width="7%" />
        <col width="14%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">순번</th>
          <th scope="col">반품번호</th>
          <th scope="col">고객명</th>
          <th scope="col">제품명</th>
          <th scope="col">반품개수</th>
          <th scope="col">반품상태</th>
          <th scope="col">등록일</th>
          <th scope="col">처리일자</th>
          <th scope="col">배정창고</th>
        </tr>
      </thead>
      <!-- tbody에 리스트 출력 -->
      <tbody v-for="(item, index) in searchlist" :key="item">
        <tr @click="detailChk(item.return_id)">
          <td>{{ index + 1 }}</td>
          <td>{{ item.return_id }}</td>
          <td>{{ item.client }}</td>
          <td>{{ item.sales_nm }}</td>
          <td>{{ item.return_cnt }}</td>
          <td>{{ statusData(item.deliverStatus,'U,E','반품준비,반품완료') }}</td>
          <td>{{ printDate(item.regdate) }}</td>
          <td>{{ printDate(item.editdate) }}</td>
          <td>{{ item.wh_nm }}</td>
        </tr>
      </tbody>
    </table>
    <!--// 테이블 영역 -->
    <div class="paging_area" id="comnGrpCodPagination">
      <paginate
        v-model="currentPage"
        :page-count="page()"
        :page-range="page()"
        :margin-pages="page()"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >
      </paginate>
    </div>
    <!-- 페이징 영역 -->
  </div>
  <!-- //content 영역 -->
</template>

<script>
import Paginate from "vuejs-paginate-next";
import { openModal } from "jenesius-vue-modal";
import rfbyModal from "../rfbyModal.vue";
import twLib from "@/assets/js/twLib.js";

export default {
  data: function () {
    return {
      searchlist: [],
      cal1: "",
      cal2: "",
      sname: "",
      radio_cal: "all",
      radioshow: false,
      searchKey: "",
      currentPage: 1,
      pageSize: 5,
      totalCnt: 0,
      return_id: "",
    };
  },
  components: {
    
    paginate: Paginate,
  },
  methods: {
    statusData: function (dte, key, val) {
      return this.$stv(dte, key, val);
    },
    printDate: function (date) {
      return this.$dfm(date);
    },
    //리스트 값 가져오기
    listsearch: function (page) {
      if (page != "" && page != undefined) {
        this.currentPage = 1;
      }
      let vm = this;

      let params = new URLSearchParams();
      params.append("sname", this.sname);
      params.append("currentPage", this.currentPage);
      params.append("pageSize", this.pageSize);
      params.append("cal1", this.cal1);
      params.append("cal2", this.cal2);
      this.axios
        .post("/dlm/listRefund.do", params)
        .then(function (response) {
          //console.log(response);
          vm.totalCnt = response.data.totalCntListDeliOrder;
          vm.searchlist = response.data.listRefund;
          vm.$log("vm.searchlist",vm.searchlist);
        })
        .catch(function (error) {
          alert("에러! API 요청에 오류가 있습니다. " + error);
        });
    },
    page: function () {
      var total = this.totalCnt;
      var page = this.pageSize;
      var xx = total % page;
      var result = parseInt(total / page);
      if (xx == 0) {
        return result;
      } else {
        result = result + 1;
        return result;
      }
    },
    clickCallback: function (pageNum) {
      this.currentPage = pageNum;
      //this.Paginate.pageNum = 10;
      this.listsearch();
    },
    rchange: function () {
      if (this.radio_cal == "all") {
        this.radioshow = false;
        this.cal1 = "";
        this.cal1 = "";
      } else {
        this.radioshow = true;
        this.cal1 = "";
        this.cal1 = "";
      }
    },
    detailChk: function (return_id) {  
      const md = openModal(rfbyModal, {
        return_id: return_id,
      });
    },
  },
  mounted() {
    this.listsearch();
  },
};
</script>