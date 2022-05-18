<template>
    <div class="about">
        <input type="hidden" id="accno" name="accno" value="${accno}" />
        <!-- 수정시 필요한 num 값을 넘김  -->
        <dl>
            <dt class="strong">
                <strong>{{ title }}</strong>
            </dt>
            <hr />
            <dd class="content">
                <table class="col">
                    <caption>
                        caption
                    </caption>
                    <tbody>
                        <!-- 상단 tbody 시작 -->
                        <tr>
                            <th class="thclass" scope="row">
                                업허가번호 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="coplicense"
                                    id="coplicense"
                                    v-model="datalist.coplicense"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                구분 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="hidden"
                                    class="inputTxt p100"
                                    name="divcd"
                                    v-model="datalist.divcd"
                                    v-bind:disabled="readed"
                                />
                                <span v-if="datalist.divcd == '1'">제조</span>
                                <span v-else-if="datalist.divcd == '2'"
                                    >수리</span
                                >
                                <span v-else-if="datalist.divcd == '3'"
                                    >판매</span
                                >
                            </td>
                        </tr>
                    </tbody>
                    <!-- 상단 tbody 끝 -->
                    <tbody>
                        <!-- 하단 tbody 시작 -->
                        <tr>
                            <th class="thclass" scope="row">
                                제품명(품목명 및 형명)
                                <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="copnm"
                                    id="copnm"
                                    v-model="datalist.copnm"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                개인용자외선조사기
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th class="thclass" scope="row">형상 및 구조</th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="shape"
                                    id="shape"
                                    v-model="datalist.shape"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                별 첨 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th class="thclass" scope="row">
                                원자재 또는 성분 및 분량
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                별 첨 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th class="thclass" scope="row">제조방법</th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                별 첨 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th class="thclass" scope="row">
                                성능 및 사용 목적
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="usepurpose"
                                    id="usepurpose"
                                    v-model="datalist.usepurpose"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                별 첨 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th class="thclass" scope="row">
                                조작방법 또는 사용방법
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="usemethod"
                                    id="usemethod"
                                    v-model="datalist.usemethod"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                별 첨 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th class="thclass" scope="row">
                                사용 시 주의사항
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="hints"
                                    id="hints"
                                    v-model="datalist.hints"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                별 첨 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th class="thclass" scope="row">포장단위</th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                별 첨 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th class="thclass" scope="row">
                                저장방법 및 사용기간
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                별 첨 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th class="thclass" scope="row">시험규격</th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                별 첨 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th class="thclass" scope="row">제조원</th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="manufacturer"
                                    id="manufacturer"
                                    v-model="datalist.manufacturer"
                                    v-bind:disabled="readed"
                                />
                            </td>
                            <th class="thclass" scope="row">
                                별 첨 <span class="font_red">*</span>
                            </th>
                            <td class="tdclass">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="none"
                                    id="none"
                                    value="-"
                                    v-bind:disabled="readed"
                                />
                            </td>
                        </tr>
                    </tbody>
                    <!-- 하단 tbody 끝 -->
                    <br />
                    <tbody>
                        <th class="thclass" colspan="12">
                            의료기기법 제5 조 및 같은 법 시행규칙 제5 조 제2
                            항에 따라 위와 같이 허가
                        </th>
                    </tbody>
                    <br />
                    <tbody>
                        <th class="thclass" colspan="12">2020년 5월 1일</th>
                    </tbody>
                    <br />
                    <tbody>
                        <th class="thclass" colspan="12">
                            식품의약품안전청장 (인)
                        </th>
                    </tbody>
                </table>
            </dd>
        </dl>
    </div>
</template>

<script>
import { readonly } from "@vue/reactivity";

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
                        console.log(
                            "에러! API 요청에 오류가 있습니다. " + error
                        );
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