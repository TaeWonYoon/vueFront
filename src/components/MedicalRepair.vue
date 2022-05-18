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
        <!-- s : 여기에 내용입력 -->
        <table class="col">
          <caption>
            caption
          </caption>
          
          <tbody> <!-- tbody 시작 -->
            <tr>
              <th class="thclass" scope="row">접수번호 <span class="font_red">*</span></th>
              <td class="tdclass"><input type="text" class="inputTxt p100" name="accno" 
                  id="accno" v-model="accno" v-bind:disabled="readed" /></td>
              <th class="thclass" scope="row">접수일자 <span class="font_red">*</span></th>
              <td class="tdclass"><input type="text" class="inputTxt p100" name="regDate" 
                  id="regDate" v-model="datalist.regDate" v-bind:disabled="readed" /></td>
            </tr>
            <tr>
              <th class="thtitle" colspan="12"><span>신고인(대표자)</span></th>
            </tr>
            <tr>
              <th class="thclass" scope="row">성명 <span class="font_red">*</span></th>
              <td class="tdclass"><input type="text" class="inputTxt p100" name="dec_name" 
                  id="dec_name" v-model="datalist.dec_name" v-bind:disabled="varlist" /></td>
              <th class="thclass" scope="row">생년월일 <span class="font_red">*</span></th>
              <td class="tdclass">
                <Datepicker v-model="datalist.dec_birth" :format="format"/>
              </td>
            </tr>
            <tr>
              <th class="thclass" scope="row">등록기준지 <span class="font_red">*</span></th>
              <td colspan="3" class="tdclass"><input type="text" class="inputTxt p100" name="dec_address" 
                  id="dec_address" v-model="datalist.dec_address" v-bind:disabled="varlist" /></td>
            </tr>
            <tr>
              <th class="thtitle" colspan="12"><span>제조(수입)업소</span></th>
            </tr>
            <tr>
              <th class="thclass" scope="row">영업소명 <span class="font_red">*</span></th>
              <td class="tdclass"><input type="text" class="inputTxt p100" name="copnm" 
                  id="copnm" v-model="datalist.copnm" v-bind:disabled="varlist" /></td>
              <th class="thclass" scope="row">전화번호 <span class="font_red">*</span></th>
              <td class="tdclass"><input type="text" class="inputTxt p100" name="copphone" maxlength="12"
                  id="copphone" v-model="datalist.copphone" v-bind:disabled="varlist" /></td>
            </tr>
            <tr>
              <th class="thclass" scope="row">주소 <span class="font_red">*</span></th>
              <td colspan="3" class="tdclass"><input type="text" class="inputTxt p100" name="copaddress" 
                  id="copaddress" v-model="datalist.copaddress" v-bind:disabled="varlist" /></td>
            </tr>
            <tr>
              <th colspan="12" style="height: 30px;"><span>수리대상 의료기기의 유형 </span><span class="font_red">*</span></th>
            </tr>
            <tr>
              <td colspan="12" class="tdclass"><input type="text" class="inputTxt p100" name="meditype" 
                  id="meditype" v-model="datalist.meditype" v-bind:disabled="varlist" /></td>
            </tr>
            <tr>
              <th class="thclass" scope="row">다른 겸업 여부 </th>
              <td class="tdclass"><input type="text" class="inputTxt p100" name="otheryn" 
                  id="otheryn" v-model="datalist.otheryn" v-bind:disabled="varlist" /></td>
              <th class="thclass" scope="row">비고 </th>
              <td class="tdclass"><input type="text" class="inputTxt p100" name="etc" 
                  id="etc" v-model="datalist.etc" v-bind:disabled="varlist" /></td>
            </tr>
            <tr>
              <th class="thclass" scope="row">신고인 <span class="font_red">*</span></th>
              <td colspan="3" class="tdclass"><input type="text" class="inputTxt p100" name="dec_name" 
                  id="dec_name" v-model="datalist.dec_name" v-bind:disabled="readed"/></td>
              
            </tr>
            <tr>
              <th class="thclass" scope="row">담당자 성명 <span class="font_red">*</span></th>
              <td class="tdclass"><input type="text" class="inputTxt p100" name="manager" 
                  id="manager" v-model="datalist.manager" v-bind:disabled="varlist" /></td>
              <th class="thclass" scope="row">담당자 전화번호 <span class="font_red">*</span></th>
              <td class="tdclass"><input type="text" class="inputTxt p100" name="managerphone" maxlength="12"
                  id="managerphone" v-model="datalist.managerphone" v-bind:disabled="varlist" /></td>
            </tr>
          </tbody> <!-- tbody 끝 -->
        </table>

        <div class="btn_areaC" v-if="this.accyn != '승인'">
          <a class="btnType blue" @click="fnSaveMedicalCod()" id="btnSaveCod" name="btn">
            <span>저장</span>
          </a>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { readonly } from '@vue/reactivity';
import { ref } from "vue";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";

export default {
  props: { title: String, accNo: String, accYn: String, predivcd: String },
  data: function () {
    return {
      datalist: "",
      accno: this.accNo,
      readed: readonly,
      varlist: "",
      accyn: this.accYn,
      divcd: this.predivcd,
    };
  },
  components: {
    Datepicker,
  },
  setup() {
    const dec_birth = ref(new Date());
    const format = (dec_birth) => {

      // day에 0 붙이기
      var newday;
      if (dec_birth.getDate() < 10) {
        newday = "0" + dec_birth.getDate();
      } else {
        newday = dec_birth.getDate();
      }
      const day = newday;

      // month에 0 붙이기
      let month = dec_birth.getMonth() + 1;
      month = month >= 10 ? month : "0" + month;

      const year = dec_birth.getFullYear();
      return `${year}-${month}-${day}`;
    }
    return {
      dec_birth,
      format,
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
      var today = new Date().toISOString().substr(0, 10).replace('T', '');
      if (this.accno == null || this.accno == "") {
        this.axios
          .post("/adm/selectEmptyCod.do", params)
          .then((response) => {

            this.datalist = response.data.selectEmptyCod;
            this.varlist = 0;
            this.datalist.regDate = today;
            this.datalist.accyn = 0;
            this.action = "I";
          })
          .catch(function (error) {
            console.log("에러! API 요청에 오류가 있습니다. " + error);
          });
      } else if (this.accno != null) {
        var params = new URLSearchParams(); 
        params.append("accno", this.accno);
        params.append("accyn", this.accyn);

        if (this.accyn != '승인') {
          this.axios
            .post("/adm/selectApprovalCod.do", params)
            .then((response) => {
              console.log(response);

              this.datalist = response.data.ApprovalModel;
              this.datalist.regDate = today;
              this.varlist = 0;
              this.divcd = "2";
              this.action = "U";
            })
            .catch(function (error) {
              console.log("에러! API 요청에 오류가 있습니다. " + error);
            });
        } else if (this.accyn == '승인') {
          this.axios
            .post("/adm/selectApprovalCod.do", params)
            .then((response) => {
              console.log(response);
              console.log("수리업 승인용 response.data.resultMsg: " + response.data.resultMsg);

              this.datalist = response.data.ApprovalModel;
              this.varlist = 1;
            })
            .catch(function (error) {
              console.log("에러! 수리업 승인 건 API 요청에 오류가 있습니다. " + error);
            });
        }
      } 
    },
    fnSaveMedicalCod: function () {
      var params = new URLSearchParams();

      const tempdate = new Date(this.datalist.dec_birth);
      var anddate;
      let newdate = tempdate.getFullYear() + "-";
      if (tempdate.getMonth() >= 10) {
        anddate = tempdate.getMonth() + 1;
        newdate += anddate + "-" ;
      } else if (tempdate.getMonth() < 10) {
        anddate = tempdate.getMonth() + 1;
        newdate += "0" + anddate + "-";
      }
      if (tempdate.getDate() < 10)  {
        newdate += "0" + tempdate.getDate();
      } else {
        newdate += tempdate.getDate();
      }
      this.datalist.dec_birth = newdate;
      console.log("params로 넘어오는 생년월일: " + this.datalist.dec_birth);

      params.append("accno", this.accno);
      params.append("regDate", this.datalist.regDate);
      params.append("dec_name", this.datalist.dec_name);
      params.append("dec_birth", this.datalist.dec_birth);
      params.append("dec_address", this.datalist.dec_address);
      params.append("copnm", this.datalist.copnm);
      params.append("copphone", this.datalist.copphone);
      params.append("copaddress", this.datalist.copaddress);
      params.append("meditype", this.datalist.meditype);
      params.append("otheryn", this.datalist.otheryn);
      params.append("etc", this.datalist.etc);
      params.append("accyn", this.datalist.accyn);
      params.append("manager", this.datalist.manager);
      params.append("managerphone", this.datalist.managerphone);
      params.append("action", this.action); 
      params.append("divcd", this.divcd);

      this.axios
        .post("/adm/saveApprovalcod.do", params)
        .then((response) => {
          
          console.log("수리업 저장된 결과: " + response);

          let msg = response.data.resultMsg;

          if (msg != "UPDATED" && msg != "UPDATED") {
            alert("수리업 저장 결과: " + msg);
            this.$router.go();
          } else {
            alert("저장 성공.");
          }
        })
        .catch(function (error) {
          console.log("에러! 수리업 Save 요청에 오류가 있습니다. " + error);
        });
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
#meditype {
  height: 55px;
}
</style>