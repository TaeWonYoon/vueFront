<template>
  <div class="modalList">
    <input type="hidden" id="accno" name="accno" value="${accno}">
    <dl>
      <dt class="modal3">
        <strong class="modalstrong">{{ title }}</strong>
      </dt>
      <dd class="content">
        <!-- s : 여기에 내용입력 -->
        <table class="col">
          <caption>
            caption
          </caption>

          <tbody id="modalChoice">
            <!-- tbody 시작 -->
            <tr>
              <td class="tdchoice" colspan="3">
                <input type="radio" class="radiobtn" value="1" name="radiochoice" id="radiochoice" v-model="divcd"/>의료기기 제조(수입)신고서&nbsp;&nbsp;
                <input type="radio" class="radiobtn" value="2" name="radiochoice" id="radiochoice" v-model="divcd"/>의료기기 수리업 신고서&nbsp;&nbsp;
                <input type="radio" class="radiobtn" value="3" name="radiochoice" id="radiochoice" v-model="divcd"/>의료기기 판매(임대)업 신고서&nbsp;&nbsp;
              </td>
            </tr>
          </tbody>
          <!-- tbody 끝 -->
        </table>

        <div class="btn_areaC">
          <a class="btnType blue" @click="choice(this.divcd)" id="btnSaveCod" name="btn">
            <span>등록하기</span>
          </a>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { openModal } from "jenesius-vue-modal";

import ApprovalModal from "@/components/ApprovalModal.vue";
import MedicalRepair from "@/components/MedicalRepair.vue";
import MedicalSaleRent from "@/components/MedicalSaleRent.vue";

export default {
  props: { title: String },
  data: function () {
    return {
      divcd: "",
    };
  },

  methods: {
    choice: function () {
      
      var savemodal = this.divcd;

      if (savemodal == 1) {
        const modal = openModal(ApprovalModal, {
          title: "의료기기 제조(수입)신고서 등록",
          predivcd : this.divcd,
        });

        modal.onclose = () => {
          console.log("Close");
          return false; //Modal will not be closed
        };
      } else if (savemodal == 2) {
        const modal = openModal(MedicalRepair, {
          title: "의료기기 수리업 신고서",
          predivcd : this.divcd,
        });

        modal.onclose = () => {
          console.log("Close");
          return false; //Modal will not be closed
        };
      } else {
        const modal = openModal(MedicalSaleRent, {
          title: "의료기기 판매(임대)업 신고서",
          predivcd : this.divcd,
        });

        modal.onclose = () => {
          console.log("Close");
          return false; //Modal will not be closed
        };
      }
    },
  },
};
</script>

<style>
.modalList {
  background-color: white;
  font-size: 14px;
  border: #acafb3 2px solid;
}
.modal3 {
  height: 50px;
}
.modalstrong {
  line-height: 3;
  font-size: 16px;
}
</style>
