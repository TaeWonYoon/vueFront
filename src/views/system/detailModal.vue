<template>
<div id="templateDiv">
<dl>
    <dd class="content"></dd>
    <dt>
      <strong>{{ title }}</strong>
    </dt>
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
          <td colspan="2">
            <strong>{{ title }}</strong>
          </td>
        </tr>

        <tr>
          <th scope="row">그룹 코드 <span class="font_red">*</span></th>
          <td>
            <input
              type="text"
              class="inputTxt p100"
              name="grp_cod"
              id="grp_cod"
              v-model="grp_cod"
            />
          </td>
          <th scope="row">그룹 코드 명 <span class="font_red">*</span></th>
          <td>
            <input
              type="text"
              class="inputTxt p100"
              name="grp_cod_nm"
              id="grp_cod_nm"
              v-model="grp_cod_nm"
            />
          </td>
        </tr>
        <tr>
            <th scope="row">상세 코드 <span class="font_red">*</span></th>
            <td>
                <input
                type="text"
                class="inputTxt p100"
                name="grp_cod"
                id="grp_cod"
                v-model="grp_cod"
                />
            </td>
            <th scope="row">상세 코드 명</th>
            <td colspan="3">
                <input
                type="text"
                class="inputTxt p100"
                />
            </td>
        </tr>
        <tr>
            <th scope="row">상세 코드 설명</th>
            <td colspan="6">
                <input
                type="text"
                class="inputTxt p100"
                name="grp_cod_eplti"
                id="grp_cod_eplti"
                v-model="grp_cod_eplti"
                />
            </td>
        </tr>

        <tr>
          <th scope="row">사용 유무 <span class="font_red">*</span></th>
          <td colspan="3">
            <input
              type="radio"
              name="grp_use_poa"
              id="grp_use_poa_1"
              value="Y"
              v-model="grp_use_poa"
            />
            <label for="radio1-1">사용</label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              name="grp_use_poa"
              id="grp_use_poa_2"
              value="N"
              v-model="grp_use_poa"
            />
            <label for="radio1-2">미사용</label>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- e : 여기에 내용입력 -->

    <div class="btn_areaC mt30">
      <input type="hidden" name="Action" id="Action" value="" />
      <a @click="save()" class="btnType blue" id="btnSaveGrpCod" name="btn"
        ><span>저장</span></a
      >
      <a
        @click="deletefrpcd()"
        class="btnType blue"
        id="btnDeleteGrpCod"
        name="btn"
        v-show="delshow"
        ><span>삭제</span></a
      >
    </div>
  </dl>
  </div>
</template>

<script>
export default {
    props: { title: String, action: String },
    data: function () {
    return {
        title: this.title,
        action: this.action,
        grp_cod: "vvvvvvvvvvvv",
        grp_cod_nm: "cccccccccc"
        }
    },
    mounted: function() {
    }
  // vue에서는 받아온 변수를 methods에서 직접 핸들링이 불가능하기 때문에
  // 임시 변수를 만들어서 받아온 변수를 넣어 줘야 함
}
</script>

<style>
.modal-container {
  z-index: 999;
  
}
#templateDiv {
    border: 20px solid white;
    z-index: 1000;
    background: white;
}
</style>