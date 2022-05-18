<template>
  <!-- 모달 배경 -->
  <div id="mask"></div>

  <div id="wrap_area">
    <h2 class="hidden">header 영역</h2>

    <h2 class="hidden">컨텐츠 영역</h2>
    <div id="container">
      <ul>
        <li class="lnb">
          <!-- lnb 영역 -->
          <leftMenu></leftMenu>
          <!--// lnb 영역 -->
        </li>
        <li class="contents">
          <!-- contents -->
          <h3 class="hidden">contents 영역</h3>
          <!-- content -->
          <div class="content">
            <p class="Location">
              <a href="/home" class="btn_set home">메인으로</a>
              <span class="btn_nav bold">게시판</span>
              <span class="btn_nav bold">의료기기 관리</span>
              <a href="/about" class="btn_set refresh">새로고침</a>
            </p>

            <p class="conTitle">
              <span>신고서 목록/조회/승인</span>
              <span class="fr">
                <div id="searcharea">
                  <!-- 검색 조건 -->
                  <table class="approvalTable">
                    <tr class="approvalTr">
                      <td class="approvalTd">&nbsp;&nbsp;</td>
                      <td class="approvalTd2">
                        <select
                          id="searchstatus"
                          name="searchstatus"
                          v-model="searchstatus"
                        >
                          <option value="appr_or" name="appr_select">
                            승인여부
                          </option>
                          <option value="0" name="appr_select">승인요청</option>
                          <option value="1" name="appr_select">승인</option>
                          <option value="2" name="appr_select">반려</option>
                        </select>
                        <select
                          id="searchkey"
                          name="searchkey"
                          v-model="searchkey"
                        >
                          <option value="all_cod" name="all_select">
                            전체
                          </option>
                          <option value="0" name="all_select">
                            의료기기 이름
                          </option>
                          <option value="1" name="all_select">업체명</option>
                          <option value="2" name="all_select">등록자</option>
                        </select>

                        <input
                          type="text"
                          id="searchword"
                          name="searchword"
                          v-model="searchword"
                        />
                        <a
                          class="btnType blue"
                          id="btnSearch"
                          name="btn"
                          @click="searchapprovallist()"
                          ><span>검 색</span></a
                        >&nbsp;
                        <a
                          class="btnType blue"
                          @click="modalList()"
                          name="modal"
                        >
                          <span>신고서 등록</span></a
                        >
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- 검색 조건 끝 -->

                <div class="approval-table" id="divApprovalList">
                  <table class="col" id="divApprovalList-table">
                    <caption>
                      신고서 목록/조회/승인
                    </caption>
                    <colgroup>
                      <col width="10%" />
                      <col width="20%" />
                      <col width="20%" />
                      <col width="10%" />
                      <col width="15%" />
                      <col width="10%" />
                      <col width="15%" />
                    </colgroup>

                    <thead>
                      <tr>
                        <th scope="col">접수번호</th>
                        <th scope="col">의료기기 이름</th>
                        <th scope="col">업체명</th>
                        <th scope="col">등록자</th>
                        <th scope="col">날짜</th>
                        <th scope="col">승인여부</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody v-for="item in listitem" :key="item.accno">
                      <tr>
                        <td
                          @click="
                            detailview(item.accno, item.accyn, item.divcd)
                          "
                        >
                          {{ item.accno }}
                        </td>
                        <td
                          @click="
                            detailview(item.accno, item.accyn, item.divcd)
                          "
                        >
                          {{ item.modelnm }}
                        </td>
                        <td
                          @click="
                            detailview(item.accno, item.accyn, item.divcd)
                          "
                        >
                          {{ item.copnm }}
                        </td>
                        <td>{{ item.dec_name }}</td>
                        <td>{{ item.regDate }}</td>
                        <td @click="detailcerti(item.accno, item.accyn)">
                          {{ item.accyn }}
                        </td>
                        <td>
                          <a
                            class="btnType blue"
                            id="fnDisorAgreeCod"
                            name="btn"
                            @click="fnDisorAgreeCod(item.accno, item.accyn)"
                          >
                            <span v-if="item.accyn != '승인'">승인/반려</span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- 신고서 끝 -->
              </span>
            </p>
            <paginate
              :v-model="currentPage"
              :page-count="rows()"
              :page-range="5"
              :margin-pages="0"
              :click-handler="pageCallback"
              :prev-text="'<'"
              :next-text="'>'"
              :prev-class="'prev'"
              :container-class="'pagination'"
              :page-class="'page-item'"
            >
            </paginate>
            <!-- 신고서 페이징 -->
          </div>
          <!-- content 끝 -->
        </li>
      </ul>
    </div>
  </div>
  <!-- wrap area 끝 -->
</template>

<script>
import { openModal } from "jenesius-vue-modal";

import ApprovalModal from "@/components/ApprovalModal.vue";
import MedicalRepair from "@/components/MedicalRepair.vue";
import MedicalSaleRent from "@/components/MedicalSaleRent.vue";

import ModalList from "@/components/ModalList.vue";
import ModalDisOrAgree from "@/components/ModalDisOrAgree.vue";

import SaleRentCertificate from "@/components/SaleRentCertificate.vue";
import RepairCertificate from "@/components/RepairCertificate.vue";

import leftMenu from "@/components/leftMenu.vue";

import Paginate from "vuejs-paginate-next";

export default {
  // vue.js 문법 시작
  data: function () {
    return {
      listitem: [],
      key: "",
      answer: "",
      currentPage: 1,
      pageSize: 10,
      searchstatus: "appr_or",
      searchkey: "all_cod",
      searchword: "",
      totalpage: "",
    };
  },
  components: {
    leftMenu,
    paginate: Paginate,
  },
  mounted: function () {
    this.searchapprovallist();
  },
  methods: {
    searchapprovallist: function () {
      var vm = this;
      var params = new URLSearchParams();
      params.append("currentPage", this.currentPage);
      params.append("pageSize", this.pageSize);
      params.append("searchstatus", this.searchstatus);
      params.append("searchkey", this.searchkey);
      params.append("searchword", this.searchword);

      this.axios
        .post("/adm/listApproval.do", params)
        .then(function (response) {
          console.log(response);
          vm.listitem = response.data.approvalList;
          vm.totalpage = response.data.approvalCnt;
        })
        .catch(function (error) {
          vm.answer = "에러! API 요청에 오류가 있습니다. " + error;
        });
    },

    modalList: function () {
      const modal = openModal(ModalList, {
        title: "신고서 선택",
      });
      modal.onclose = () => {
        console.log("Close");
        return false; //Modal will not be closed
      };
    },

    fnDisorAgreeCod: function (accNo, accYn) {
      const modal = openModal(ModalDisOrAgree, {
        title: "승인 및 반려",
        accNo: accNo,
        accYn: accYn,
      });
      modal.onclose = () => {
        console.log("Close");
        return false; //Modal will not be closed
      };
    },

    detailview: function (accNo, accYn, divcd) {
      if (divcd == 1) {
        var modal_1 = ApprovalModal;
        var title_1 = "의료기기 제조(수입) 신고서";
      } else if (divcd == 2) {
        modal_1 = MedicalRepair;
        title_1 = "의료기기 수리업 신고서";
      } else if (divcd == 3) {
        modal_1 = MedicalSaleRent;
        title_1 = "의료기기 판매업 신고서";
      }

      if (accNo == null || accNo == "") {
        console.log("Insert");
        const modal = openModal(modal_1, {
          title: title_1,
          accNo: "",
        });

        modal.onclose = () => {
          console.log("Close");
          this.searchapprovallist();
          return false; //Modal will not be closed
        };
      } else {
        console.log("Update");
        const modal = openModal(modal_1, {
          title: title_1,
          accNo: accNo,
          accYn: accYn,
        });

        modal.onclose = () => {
          console.log("Close");
          this.searchapprovallist();
          return false;
        };
      }
    },

    detailcerti: function (accNo, accyn) {
      if (accyn == "승인") {
        console.log("허가증");
        const modal = openModal(SaleRentCertificate, {
          title: "의료기기 제조품목 허가증",
          accNo: accNo,
        });

        modal.onclose = () => {
          console.log("Close");
          this.searchapprovallist();
          return false;
        };
      } else if (accyn == "승인요청") {
        console.log("신고증");
        const modal = openModal(RepairCertificate, {
          title: "의료기기 수리업 신고증",
          accNo: accNo,
        });

        modal.onclose = () => {
          console.log("Close");
          this.searchapprovallist();
          return false;
        };
      }
    },

    pageCallback: function (currentPage) {
      console.log(currentPage);
      this.currentPage = currentPage;
      this.searchapprovallist(currentPage);
    },

    rows: function () {
      var totalPg = this.totalpage;
      var pagesz = this.pageSize;
      var xx = totalPg % pagesz;
      var result = parseInt(totalPg / pagesz);

      if (xx == 0) {
        return result;
      } else {
        result = result + 1;
        return result;
      }
    },
  },
};
</script>

<style lang="css">
/* Adopt bootstrap pagination stylesheet. */
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

.btnlist {
  text-align: right;
}
.approvalTable {
  margin-bottom: 10px;
  width: 100%;
  cellpadding: 5;
  cellspacing: 0;
  border: 1;
  align: left;
}
.approvalTr {
  border: 0px;
  border-color: blue;
}
.approvalTd {
  width: 80px;
  height: 25px;
  font-size: 120%;
}
.approvalTd2 {
  width: auto;
  height: 25;
  font-size: 100%;
  text-align: left;
  padding-right: 25px;
}
.content select {
  max-width: 150px;
  margin-right: 5px;
}
.content input {
  width: 300px;
  height: 30px;
  margin-right: 5px;
}
#divApprovalList-table {
  line-height: 30px;
}
.pagination {
  display: inline-block;
}
.page-item {
}
li.page-item.disabled {
  display: none;
}
.page-item.active .page-link {
  z-index: 0;
}
</style>
