<template>
  <div class="about">
    <input type="hidden" id="accno" name="accno" value="${accno}">
    <!-- 수정시 필요한 num 값을 넘김  -->
    <dl>
      <dt class="strong">
        <strong>{{ title }}</strong>
      </dt>
      <hr>
      <dd class="content">
        <table class="col">
          <caption>
            caption
          </caption>
          <tbody> <!-- 상단 tbody 시작 -->
            <tr>
              <th class="thclass" scope="row">업소명 <span class="font_red">*</span></th>
              <td colspan="3" class="tdclass"><input type="text" class="inputTxt p100" name="copnm" 
                  id="copnm" v-model="datalist.copnm" v-bind:disabled="readed" /></td>
            </tr>
            <tr>
              <th class="thclass" scope="row">소재지 <span class="font_red">*</span></th>
              <td colspan="3" class="tdclass"><input type="text" class="inputTxt p100" name="copaddress" 
                  id="copaddress" v-model="datalist.copaddress" v-bind:disabled="readed" /></td>
            </tr>
            <tr>
              <th class="thclass" scope="row">대표자 <span class="font_red">*</span></th>
              <td colspan="3" class="tdclass"><input type="text" class="inputTxt p100" name="dec_name" 
                  id="dec_name" v-model="datalist.dec_name" v-bind:disabled="readed" /></td>
            </tr>
            <tr>
              <th class="thclass" scope="row">생년월일 <span class="font_red">*</span></th>
              <td colspan="3" class="tdclass"><input type="text" class="inputTxt p100" name="dec_birth" 
                  id="dec_birth" v-model="datalist.dec_birth" v-bind:disabled="readed" /></td>
            </tr>
            <tr>
              <th class="thclass" scope="row">수리대상 의료기기 유형 </th>
              <td colspan="3" class="tdclass"><input type="text" class="inputTxt p100" name="meditype" 
                  id="meditype" v-model="datalist.meditype" v-bind:disabled="readed" /></td>
            </tr>
          </tbody> <!-- 상단 tbody 끝 -->
          <br>
          <tbody>
            <th class="thclass" colspan="12">의료기기법 제14 조 및 동법시행규칙</th>
          </tbody>
          <tbody>
            <th class="thclass" colspan="12">제22 조 제2 항의 규정에 따라 위와 같이</th>
          </tbody>
          <tbody>
            <th class="thclass" colspan="12">의료기기 수리업 신고를 수리합니다.</th>
          </tbody>
          <br>
          <tbody>
            <th class="thclass" colspan="12">2010년 1월 12일</th>
          </tbody>
          <br>
          <tbody>
            <th class="thclass" colspan="12">서 울 특 별 시 장</th>
          </tbody>
        </table>
      </dd>
    </dl>
  </div>
</template>

<script>
import { readonly } from '@vue/reactivity';

export default {
  props: { title: String, accNo: String },
  data: function () {
    return {
      datalist: "",
      accno: this.accNo,
      readed: readonly,
    };
  },
  computed: {
    ano: {
      get: function () {
        return this.data.accno;
      },
      set: function (v) {
        this.data.accno = v;
      },
    },
  },
  // html 로딩, 가상 dom 실행, 이 두 개 연결 시 작동
  mounted: function () {
    this.readdate();
  },
  methods: {
    readdate: function () {
      if (this.accno != null) {
        var params = new URLSearchParams();
        params.append("accno", this.accno);
        
        this.axios
          .post("/adm/selectApprovalCod.do", params)
          .then((response) => {
            console.log(response);
            this.datalist = response.data.ApprovalModel;
          })
          .catch(function (error) {
            console.log("에러! API 요청에 오류가 있습니다. " + error);
          });
      } 
    },
  },
};
</script>

<style>
.about {
  background-color: white;
  font-size: 14px;
}
.strong {
  line-height: 50px;
  font-size: 16px;
}
.thtitle {
  height: 39px;
  text-align: center;
}
.thclass {
  padding: 0px 10px;
}
</style>