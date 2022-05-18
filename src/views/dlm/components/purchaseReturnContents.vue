<template>

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
        <td width="40" height="25" style="font-size: 120%">&nbsp;<b>반품</b></td>
        <td width="*" height="25" style="font-size: 100%; text-align: center">
          <!-- select option -->
          <select
            id="searchKey"
            name="searchKey"
            v-model="roname"
            style="width: 80px; height: 27px"
          >
            <option value="" selected>전체</option>
            <option value="E">반품준비</option>
            <option value="O">반품완료</option>
          </select>
          <!-- search name -->
          <input
            type="text"
            style="width: 150px; height: 25px"
            id="sname"
            v-model="rsname"
            name="sname"
            placeholder="제품명 입력"
          />
          &nbsp;&nbsp;&nbsp;
          <!-- calendar date -->
          <input
            type="radio"
            name="rradio_cal"
            value="all"
            v-model="rradio_cal"
            @change="rrchange"
          /><label for="radio_cal1">전체</label>
          <input
            type="radio"
            value="choice"
            name="rradio_cal"
            v-model="rradio_cal"
            @change="rrchange"
          /><label for="radio_cal2">선택</label>
          <input
            type="date"
            v-model="rcal1"
            v-show="rradioshow"
            style="height: 25px"
          />
          <input
            type="date"
            v-model="rcal2"
            v-show="rradioshow"
            style="height: 25px"
          />
          <!-- button -->
          <a
            class="btnType blue"
            id="btnSearch"
            name="btn"
            @click="rlistsearch('1')"
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
        <col width="10%" />
        <col width="*%" />
        <col width="10%" />
        <col width="14%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">순번</th>
          <th scope="col">상품번호</th>
          <th scope="col">상품</th>
          <th scope="col">업체명</th>
          <th scope="col">수량</th>
          <th scope="col">총액</th>
          <th scope="col">상태</th>
          <th scope="col">반품처리일</th>
        </tr>
      </thead>
      <!-- tbody에 리스트 출력 -->
      <tbody v-for="(item, index) in rsearchlist" :key="item">
        <tr @click="
              rdetailClick(item.return_id)
            ">
          <td>{{ index + 1 }}</td>
          <td>{{ item.return_id }}</td>
          <td>{{ item.sales_nm }}</td>
          <td>{{ item.mfcomp }}</td>
          <td>
            {{ item.return_cnt }}
          </td>
          <td>{{ numFormmat(item.return_cnt *item.price) }}</td>
          <td>{{ statusData(item.deliverStatus,"E,O","반품준비,반품완료")}}</td>
          <td>{{ printDate(item.editdate) }}</td>
        </tr>
      </tbody>
    </table>
    <!--// 테이블 영역 -->
    <div class="paging_area" id="comnGrpCodPagination">
      <paginate
        v-model="rcurrentPage"
        :page-count="rpage()"
        :page-range="rpage()"
        :margin-pages="rpage()"
        :click-handler="rclickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >
      </paginate>
    </div>
</template>


<script>
import Paginate from "vuejs-paginate-next";
import { openModal } from "jenesius-vue-modal";
import pcoModal2 from "../pcoModal2.vue";
import twLib from "@/assets/js/twLib.js";

export default {
  data: function () {
    return {
        rsearchlist: [],
        rcal1  : "",
        rcal2  : "",
        rsname : "",
        roname : "",
        radio_cal : "all",
        rradio_cal : "all",
        rradioshow : false,
        delverStatus : "",
        rcurrentPage: 1,
        rpageSize: 5,
        rtotalCnt: 0,
        return_id: 0,
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
        rlistsearch: function (page) {
            if (page != "" && page != undefined) {
            this.rcurrentPage = 1;
            }
            let vm = this;

            let params = new URLSearchParams();
            params.append("rcurrentPage", this.rcurrentPage);
            params.append("rpageSize", this.rpageSize);
            params.append("rsname", this.rsname);
            params.append("roname", this.roname);
            params.append("rcal1", this.rcal1);
            params.append("rcal2", this.rcal2);
            this.axios
            .post("/dlm/listPurchaseReturn.do", params)
            .then(function (response) {
                vm.rtotalCnt = response.data.rtotalCntListDeliOrder;
                vm.rsearchlist = response.data.ListPurchaseReturn;
                vm.$log("rsearchlist",vm.rsearchlist)
            })
            .catch(function (error) {
                alert("에러! API 요청에 오류가 있습니다. " + error);
            });
        },
        rpage: function () {
            var total = this.rtotalCnt;  
            var page = this.rpageSize;
            var xx = total % page;
            var result = parseInt(total / page);
            if (xx == 0) {
            return result;
            } else {
            result = result + 1;
            return result;
            }
        },
        rclickCallback: function (pageNum) {
            this.rcurrentPage = pageNum;
            //this.Paginate.pageNum = 10;
            this.rlistsearch();
        },
        rrchange: function () {
            if (this.rradio_cal == "all") {
            this.rradioshow = false;
            } else {
            this.rradioshow = true;
            }
        },
        numFormmat: function(date) {
            return this.$nfm(date);
        },
        rdetailClick: function(returnId) {
            const md2 = openModal(pcoModal2, {
                returnId: returnId,
            });
        },
    },
    mounted() {
        this.rlistsearch();
    },
};
</script>