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
              <a href="/hwang" class="btn_set home">메인으로</a>
              <span class="btn_nav bold">게시판</span>
              <span class="btn_nav bold">공지사항 관리</span>
              <a href="/hwang" class="btn_set refresh">새로고침</a>
            </p>

            <p class="conTitle">
              <span>공지사항</span>
              <span class="fr">
                <div style="text-align: right">
                  <a class="btnType blue" @click="detailview()" name="modal">
                    <span>신규등록</span></a
                  >
                </div>

                <div>
                  <table class="col">
                    <caption>
                      공지사항
                    </caption>
                    <colgroup>
                      <col width="5%" />
                      <col width="50%" />
                      <col width="20%" />
                      <col width="25%" />
                    </colgroup>

                    <thead>
                      <tr>
                        <th scope="col">번호</th>
                        <th scope="col">제목</th>
                        <th scope="col">작성일</th>
                        <th scope="col">작성자</th>
                      </tr>
                    </thead>
                    <tbody v-for="item in items" :key="item.noticeNo">
                      <tr @click="detailview(item.noticeNo)">
                        <td>{{ item.noticeNo }}</td>
                        <td>{{ item.noticeTitle }}</td>
                        <td>{{ item.noticeRegdate }}</td>
                        <td>{{ item.loginId }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
              </span>
            </p>
          </div>
        </li>
      </ul>

      <!-- 팝업창 닫고 목록 조회 -->
    </div>
  </div>
</template>

<script>
//const _ = require("lodash");
import { openModal } from "jenesius-vue-modal";
//import WidgeTestModal from "WidgeTestModal.vue";
import WidgeTestModal from "@/components/WidgeTestModal.vue";

import leftMenu from "@/components/leftMenu.vue";

import Paginate from "vuejs-paginate-next";

import "../assets/css/admin/basic.css";
import "../assets/css/admin/common.css";
import "../assets/css/jh_css/style.css";

//const { openModal } = useModal();

export default {
  data: function () {
    return {
      items: [],
      key: "",
      answer: "",
      currentPage: 1,
      pageSize: 10,
      noticeCnt: 0,
    };
  },
  components: {
    leftMenu,
    paginate: Paginate,
  },
  mounted: function () {
    this.searchnoticelist();
  },
  methods: {
    searchnoticelist: function () {
      var vm = this;
      var params = new URLSearchParams();
      params.append("currentPage", this.currentPage);
      params.append("pageSize", this.pageSize);

      this.axios
        .post("/inf/listinfvue.do", params)
        .then(function (response) {
          console.log(response);
          vm.items = response.data.notice;

          vm.noticeCnt = response.data.noticeCnt;
        })
        .catch(function (error) {
          vm.answer = "에러! API 요청에 오류가 있습니다. " + error;
        });
    },  
    detailview: function (no) {
      if (no == null || no == "") {
        console.log("Insert");
        const modal = openModal(WidgeTestModal, {
          title: "공지사항 등록",
          no: "",
        });

        modal.onclose = () => {
          console.log("Close");
          this.searchnoticelist();
          return false; //Modal will not be closed
        };
      } else {
        console.log(no);
        const modal = openModal(WidgeTestModal, {
          title: "공지사항 수정",
          no: no,
        });

        modal.onclose = () => {
          console.log("Close");
          this.searchnoticelist();
          return false; //Modal will not be closed
        };
      }
    },
    clickCallback: function (pageNum) {
      console.log(pageNum);

      this.currentPage = pageNum;
      //this.Paginate.pageNum = 10;
      this.searchnoticelist();
    },
    page: function () {
      var total = this.noticeCnt;
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
  },
};
</script>

<style lang="css">
/* Adopt bootstrap pagination stylesheet. */
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"; */

/* Write your own CSS for pagination */
.pagination {
}
.page-item {
}
</style>
