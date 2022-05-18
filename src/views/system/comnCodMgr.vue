<template>
  <div id="comnCodMgr">
    <p class="Location">
      <a href="../dashboard/dashboard.do" class="btn_set home">메인으로</a>
      <span class="btn_nav bold">기준정보</span>
      <span class="btn_nav bold">공통코드 관리</span>
      <a href="../system/comnCodMgr.do" class="btn_set refresh">새로고침</a>
    </p>

    <p class="conTitle">
      <span>그룹 코드</span>
      <span>
        <table
          style="margin-top: 10px; collapse; border: 1px #50bcdf;"
          width="100%"
          cellpadding="5"
          cellspacing="0"
          border="1"
          align="left"
        >
          <colgroup>
            <col width="20%" />
            <col width="80%" />
          </colgroup>
          <tr style="border: 0px; border-color: blue">
            <td height="25" style="font-size: 120%">&nbsp;&nbsp;검색조건</td>
            <td
              width="50"
              height="25"
              style="font-size: 100%; text-align: left; padding-right: 25px"
            >
              <select
                id="searchKey"
                name="searchKey"
                style="width: 150px"
                v-model="searchKey"
              >
                <option value="">전체</option>
                <option value="grp_cod">그룹코드</option>
                <option value="grp_cod_nm">그룹코드명</option>
              </select>

              <input
                type="text"
                style="width: 300px; height: 25px"
                id="sname"
                name="sname"
                v-model="sname"
              />
              <span class="fr">
                <a
                  @click="listsearch('1')"
                  class="btnType blue"
                  id="btnSearchGrpcod"
                  name="btn"
                  ><span>검 색</span></a
                >
                <a class="btnType blue" @click="rowClicked()" name="modal"
                  ><span>신규등록</span></a
                >
              </span>
            </td>
          </tr>
        </table>
      </span>
    </p>

    <div class="divComGrpCodList">
      <table class="col">
        <caption>
          caption
        </caption>
        <colgroup>
          <col width="6%" />
          <col width="17%" />
          <col width="20%" />
          <col width="20%" />
          <col width="10%" />
          <col width="15%" />
          <col width="10%" />
        </colgroup>

        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">그룹코드</th>
            <th scope="col">그룹코드명</th>
            <th scope="col">그룹코드 설명</th>
            <th scope="col">사용여부</th>
            <th scope="col">등록일</th>
            <th scope="col">삭제</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in items" :key="item.grp_cod">
            <tr>
              <td>{{ index + 1 }}</td>
              <td @click="searchdetail(item.grp_cod)">
                <a href="javascript:void(0);">{{ item.grp_cod }}</a>
              </td>
              <td>{{ item.grp_cod_nm }}</td>
              <td>{{ item.grp_cod_eplti }}</td>
              <td>{{ item.use_poa }}</td>
              <td>{{ item.reg_date }}</td>
              <td>
                <a @click="rowClicked(item.grp_cod)" class="btnType3 color1"
                  ><span>수정</span></a
                >
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

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
  </div>
  <table
    style="margin-top: 10px collapse; border: 1px #50bcdf"
    width="100%"
    cellpadding="5"
    cellspacing="0"
    border="1"
    align="left"
  >
    <tr style="border: 0px; border-color: blue">
      <td width="80" height="25" style="font-size: 120%">&nbsp;&nbsp;</td>
      <td
        width="50"
        height="25"
        style="font-size: 100%; text-align: left; padding-right: 25px"
      >
        상품 구분
        <select @change="researchgood($event)" v-model="samplecombo">
          <option value="">선택</option>
          <option
            v-for="(v, i) in comboitems"
            :key="v.dtl_cod"
            v-bind:value="v.dtl_cod"
          >
            {{ v.dtl_cod_nm }}
          </option>
        </select>
        상품
        <select v-model="goodcombo">
          <option value="">선택</option>
          <template v-for="(v, i) in selectGoodComComboitems" :key="v.cd">
            <option>
              {{ v.name }}
            </option>
          </template>
        </select>
        납품 거래처
        <select v-model="samplecli">
          <option value="">선택</option>
          <template v-for="(v, i) in selectComComboitems" :key="v.cd">
            <option>{{ v.name }}</option>
          </template>
        </select>
        <br />
        창고
        <select v-model="samplewh">
          <option value="">선택</option>
          <template v-for="(v, i) in selectComComboitems2" :key="v.cd">
            <option>{{ v.name }}</option>
          </template>
        </select>
        <select
          id="searchKey"
          name="searchKey"
          style="width: 150px"
          v-model="searchKey"
        >
          <option value="">전체</option>
          <option value="grp_cod">그룹코드</option>
          <option value="grp_cod_nm">그룹코드명</option>
        </select>
        <input
          type="text"
          style="width: 300px; height: 25px"
          id="sname"
          name="sname"
        />
        <a class="btnType blue"><span>검 색</span></a>
      </td>
    </tr>
  </table>
  <p class="conTitle mt50">
    <span>상세 코드</span>
    <span class="fr">
      <a
        @click="detailClicked()"
        class="btnType blue"
        href="javascript:void(0);"
        name="modal"
      >
        <span>신규등록</span>
      </a>
    </span>
  </p>

  <div class="divComDtlCodList">
    <table class="col">
      <caption>
        caption
      </caption>
      <colgroup>
        <col width="6%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col width="5%" />
        <col width="5%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">순번</th>
          <th scope="col">그룹코드</th>
          <th scope="col">상세코드</th>
          <th scope="col">상세코드명</th>
          <th scope="col">상세코드 설명</th>
          <th scope="col">사용여부</th>
          <th scope="col">비고</th>
        </tr>
      </thead>
      <tbody id="listComnDtlCod">
        <template v-for="(v, i) in detailitems" :key="v.grp_cod">
          <tr>
            <td>{{ i + 1 }}</td>
            <td @click="detailClicked(v.grp_cod, v.dtl_cod)">
              <a href="javasciprt:void(0)">
                {{ v.grp_cod }}
              </a>
            </td>
            <td>{{ v.dtl_cod }}</td>
            <td>{{ v.dtl_cod_nm }}</td>
            <td>{{ v.dtl_cod_eplti }}</td>
            <td>{{ v.use_poa }}</td>
            <td></td>
          </tr>
        </template>
        <tr v-show="detailChk">
          <td colspan="12">그룹코드를 선택해 주세요.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="paging_area" id="comnDtlCodPagination"></div>
  <div id="layer2" class="layerPop layerType2" style="width: 600px">
    <dl>
      <dt>
        <strong>상세코드 관리</strong>
      </dt>
      <dd class="content">
        <!-- s : 여기에 내용입력 -->

        <table class="row">
          <caption>
            caption
          </caption>
          <colgroup>
            <col width="120px" />
            <col width="*" />
            <col width="120px" />
            <col width="*" />
          </colgroup>

          <tbody>
            <tr>
              <th scope="row">그룹 코드 ID <span class="font_red">*</span></th>
              <td>
                <input
                  type="text"
                  class="inputTxt p100"
                  id="dtl_grp_cod"
                  name="dtl_grp_cod"
                />
              </td>
              <th scope="row">그룹 코드 명 <span class="font_red">*</span></th>
              <td>
                <input
                  type="text"
                  class="inputTxt p100"
                  id="dtl_grp_cod_nm"
                  name="dtl_grp_cod_nm"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">상세 코드 ID <span class="font_red">*</span></th>
              <td>
                <input
                  type="text"
                  class="inputTxt p100"
                  id="dtl_cod"
                  name="dtl_cod"
                />
              </td>
              <th scope="row">상세 코드 명 <span class="font_red">*</span></th>
              <td>
                <input
                  type="text"
                  class="inputTxt p100"
                  id="dtl_cod_nm"
                  name="dtl_cod_nm"
                />
              </td>
            </tr>

            <tr>
              <th scope="row">코드 설명</th>
              <td colspan="3">
                <input
                  type="text"
                  class="inputTxt p100"
                  id="dtl_cod_eplti"
                  name="dtl_cod_eplti"
                />
              </td>
            </tr>

            <tr>
              <th scope="row">사용 유무 <span class="font_red">*</span></th>
              <td colspan="3">
                <input
                  type="radio"
                  id="dtl_use_poa_1"
                  name="dtl_use_poa"
                  value="Y"
                />
                <label for="radio1-1">사용</label> &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="radio"
                  id="dtl_use_poa_2"
                  name="dtl_use_poa"
                  value="N"
                />
                <label for="radio1-2">미사용</label>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- e : 여기에 내용입력 -->

        <div class="btn_areaC mt30">
          <a href="" class="btnType blue" id="btnSaveDtlCod" name="btn"
            ><span>저장</span></a
          >
          <a href="" class="btnType blue" id="btnDeleteDtlCod" name="btn"
            ><span>삭제</span></a
          >
          <a href="" class="btnType gray" id="btnCloseDtlCod" name="btn"
            ><span>취소</span></a
          >
        </div>
      </dd>
    </dl>
    <a href="" class="closePop"><span class="hidden">닫기</span></a>
  </div>
</template>

<script>
import { openModal } from "jenesius-vue-modal";
import grddetailModal from "./grddetailModal.vue";
import detailModal from "./detailModal.vue";
import Paginate from "vuejs-paginate-next";

import "../../assets/css/admin/basic.css";
import "../../assets/css/admin/common.css";
import "../../assets/css/jh_css/style.css";

export default {
  data: function () {
    return {
      items: [],
      currentPage: 1,
      pageSize: 5,
      totalCnt: 0,
      searchKey: "",
      sname: "",
      action: "",
      comboitems: [],
      samplecombo: "",
      goodcombo: "",
      samplecli: "",
      samplewh: "",
      selectGoodComComboitems: [],
      selectComComboitems: [],
      selectComComboitems2: [],
      grp_cod: "",
      detailitems: [],
      detailChk: true,
      //protype: "",
    };
  },
  components: {
    paginate: Paginate,
  },
  mounted() {
    this.listsearch();
    this.detailCodeList();
    this.selectGoodComCombo();
    this.selectComCombo("cli");
    this.selectComCombo("wh");
  },
  methods: {
    searchotton: function (pageno) {
      this.currentPage = pageno;
      this.listsearch();
    },
    rowClicked: function (grpcd) {
      if (grpcd == null || grpcd == "") {
        // console.log("Insert");
        this.action = "I";

        const modal = openModal(grddetailModal, {
          title: "그룹코드 등록",
          grpcd: "",
          action: this.action,
        });

        modal.onclose = () => {
          // console.log("Close");
          //this.searchnoticelist();
          return false; //Modal will not be closed
        };
      } else {
        console.log(grpcd);

        this.action = "U";
        const modal = openModal(grddetailModal, {
          title: "그룹코드 수정",
          grpcd: grpcd,
          action: this.action,
        });

        modal.onclose = () => {
          console.log("Close");
          //this.searchnoticelist();
          return false; //Modal will not be closed
        };
      }
    },
    detailClicked: function (grpcd, dtl_cod) {
      if (grpcd == null || grpcd == "") {
        // console.log("Insert");
        this.action = "I";

        const modal2 = openModal(detailModal, {
          title: "상세코드 등록",
          action: this.action,
        });

        modal.onclose = () => {
          // console.log("Close");
          //this.searchnoticelist();
          return false; //Modal will not be closed
        };
      } else {
        console.log(grpcd);

        this.action = "U";
        const modal2 = openModal(detailModal, {
          title: "상세코드 수정",
          action: this.action,
        });

        modal2.onclose = () => {
          console.log("Close");
          //this.searchnoticelist();
          return false; //Modal will not be closed
        };
      }
    },
    listsearch: function () {
      let vm = this;

      let params = new URLSearchParams();
      params.append("currentPage", this.currentPage);
      params.append("pageSize", this.pageSize);
      params.append("oname", this.searchKey);
      params.append("sname", this.sname);
      params.append("grp_cod", this.grp_cod);
      this.axios
        .post("/system/vuelistComnGrpCod.do", params)
        .then(function (response) {
          //console.log(response);
          vm.totalCnt = response.data.totalCntComnGrpCod;

          vm.items = response.data.listComnGrpCodModel;
        })
        .catch(function (error) {
          alert("에러! API 요청에 오류가 있습니다. " + error);
        });
    },
    clickCallback: function (pageNum) {
      console.log(pageNum);

      this.currentPage = pageNum;
      //this.Paginate.pageNum = 10;
      this.listsearch();
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
    searchdetail: function (grp_cod) {
      //상세코드 리스트

      let vm = this;
      let params = new URLSearchParams();
      params.append("grp_cod", grp_cod);
      params.append("currentPage", this.currentPage);
      params.append("pageSize", this.pageSize);

      this.axios
        .post("/system/listComnDtlCodVue.do", params)
        .then(function (response) {
          //vm.comboitems = response.data.list;
          vm.detailitems = response.data.listComnDtlCodModel;
        })
        .catch(function (error) {
          alert("에러! API 요청에 오류가 있습니다. " + error);
        });
    },
    detailCodeList: function () {
      let vm = this;
      let params = new URLSearchParams();
      params.append("group_code", "proCD");

      this.axios
        .post("/commonproc/comcombo.do", params)
        .then(function (response) {
          vm.comboitems = response.data.list;
          //console.log("comboitems = " + JSON.stringify(vm.comboitems));
          vm.detailChk = false;
        })
        .catch(function (error) {
          alert("에러! API 요청에 오류가 있습니다. " + error);
        });
    },
    selectGoodComCombo: function (protype) {
      let vm = this;
      let params = new URLSearchParams();
      if (protype != "" || protype != undefined) {
        params.append("protype", protype);
      }
      this.axios
        .post("/system/selectGoodComCombo.do", params)
        .then(function (response) {
          vm.selectGoodComComboitems = response.data.list;
          console.log(JSON.stringify(vm.selectGoodComComboitems));
        })
        .catch(function (error) {
          alert("에러! API 요청에 오류가 있습니다. " + error);
        });
    },
    selectComCombo: function (type) {
      let vm = this;
      let params = new URLSearchParams();
      params.append("comtype", type);

      this.axios
        .post("/system/selectComCombo.do", params)
        .then(function (response) {
          if (type == "cli") vm.selectComComboitems = response.data.list;
          else vm.selectComComboitems2 = response.data.list;
        })
        .catch(function (error) {
          alert("에러! API 요청에 오류가 있습니다. " + error);
        });
    },
    researchgood: function (event) {
      var chgData = event.target.value;
      let protype = chgData != "" ? chgData : "";

      this.selectGoodComCombo(protype);
    },
  },
};
</script>

<style lang="css">
/* Adopt bootstrap pagination stylesheet. */
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

/* Write your own CSS for pagination */
.pagination {
}
.page-item {
}
</style>