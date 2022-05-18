<template>
    <!-- 모달팝업 -->
    <div id="layer1" style="width: 600px">
        <dl>
            <dt>
                <strong>배송지시서 상세</strong>
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
                            <th scope="row">
                                배송번호 <span class="font_red">*</span>
                            </th>
                            <td colspan="3">
                                <input
                                    type="hidden"
                                    name="deliverStatus"
                                    v-model="hidden_deliverStatus"
                                    id="hidden_deliverStatus"
                                />
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    v-model="deliv_id"
                                    name="deliv_id"
                                    id="deliv_id"
                                    readonly="readonly"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                제품명 <span class="font_red">*</span>
                            </th>
                            <td colspan="3">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="sales_nm"
                                    v-model="sales_nm"
                                    id="sales_nm"
                                    readonly="readonly"
                                />
                                <input
                                    type="hidden"
                                    class="inputTxt p100"
                                    name="sales_id"
                                    v-model="sales_id"
                                    id="sales_id"
                                    readonly="readonly"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                수량 <span class="font_red">*</span>
                            </th>
                            <td colspan="3">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    v-model="pur_cnt"
                                    name="pur_cnt"
                                    id="pur_cnt"
                                    readonly="readonly"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                배송담당자 <span class="font_red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="name"
                                    v-model="name"
                                    id="name"
                                    readonly="readonly"
                                />
                            </td>
                            <th scope="row">
                                배송상태 <span class="font_red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    v-model="deliverStatusText"
                                    id="deliverStatus"
                                    readonly="readonly"
                                />
                                <input
                                    type="hidden"
                                    class="inputTxt p100"
                                    v-model="dl_status"
                                    id="dl_status"
                                    name="dl_status"
                                    readonly="readonly"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                출발창고지 <span class="font_red">*</span>
                            </th>
                            <td colspan="3">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    v-model="wh_nm"
                                    name="wh_nm"
                                    id="wh_nm"
                                    readonly="readonly"
                                />
                                <input
                                    type="hidden"
                                    class="inputTxt p100"
                                    v-model="wh_id"
                                    name="wh_id"
                                    id="wh_id"
                                    readonly="readonly"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                주소1 <span class="font_red">*</span>
                            </th>
                            <td colspan="3">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    v-model="address"
                                    name="address"
                                    id="address"
                                    readonly="readonly"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                주소2 <span class="font_red">*</span>
                            </th>
                            <td colspan="3">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    v-model="dtAddress"
                                    name="dtAddress"
                                    id="dtAddress"
                                    readonly="readonly"
                                />
                            </td>
                        </tr>
                        <!-- 						<tr> -->
                        <!-- 							<th scope="row">배송상태 수정<span class="font_red">*</span></th> -->
                        <!-- 							<td colspan="3"> -->
                        <!-- 								<input type="radio" id="radio1-1" name="deliverStatus" id="deliverStatus_1" value='U' style="margin-left: 10px;"/> <label for="radio1-1" >배송준비</label> -->
                        <!-- 								<input type="radio" id="radio1-2" name="deliverStatus" id="deliverStatus_2" value="O" style="margin-left: 10px;"/> <label for="radio1-2" >배송시작</label> -->
                        <!-- 								<input type="radio" id="radio1-3" name="deliverStatus" id="deliverStatus_3" value="E" style="margin-left: 10px;"/> <label for="radio1-3" >배송완료</label>			 -->
                        <!-- 							</td> -->
                        <!-- 						</tr> -->
                    </tbody>
                </table>

                <!-- e : 여기에 내용입력 -->

                <div class="btn_areaC mt30">
                    <a
                        class="btnType blue"
                        @click="statusClick()"
                        v-if="statusBtnshow"
                        name="btn"
                        ><span>배송시작</span></a
                    >
                    <a
                        class="btnType blue"
                        @click="statusClick()"
                        v-if="statusFinishBtnshow"
                        name="btn"
                        ><span>배송완료</span></a
                    >
                    <a
                        class="btnType gray"
                        @click="closeModal()"
                        id="btnCloseDeliOrder"
                        name="btn"
                        ><span>닫기</span></a
                    >
                </div>
            </dd>
        </dl>

        <a href="" class="closePop"><span class="hidden">닫기</span></a>
    </div>
</template>

<script>
import { openModal } from "jenesius-vue-modal";
export default {
    props: { deliv_id: String, deliverStatus: String, deliv_wh_id: String },
    data: function () {
        return {
            hidden_deliverStatus: "",
            deliv_id: this.deliv_id,
            deliv_wh_id: this.deliv_wh_id,
            sales_nm: "",
            sales_id: "",
            pur_cnt: "",
            name: "",
            deliverStatusText: "",
            dl_status: this.deliverStatus,
            wh_nm: "",
            wh_id: "",
            address: "",
            dtAddress: "",
            statusBtnshow: false,
            statusFinishBtnshow: false,
            btnCloseDeliOrder: false,
        };
    },
    methods: {
        detail: function () {
            let vm = this;

            let params = new URLSearchParams();
            params.append("deliv_id", vm.deliv_id);
            params.append("deliverStatus", vm.deliverStatus);
            params.append("deliv_wh_id", vm.deliv_wh_id);

            this.axios
                .post("/dlm/selectDeliOrder.do", params)
                .then(function (response) {
                    if (response.data.result == "SUCCESS") {
                        let data = response.data.shippingModel;
                        vm.sales_nm = data.sales_nm;
                        vm.sales_id = data.sales_id;
                        vm.pur_cnt = data.pur_cnt;
                        let sts;
                        if (data.deliverStatus == "U") {
                            sts = "배송준비";
                            vm.statusBtnshow = true;
                            vm.statusFinishBtnshow = false;
                        } else if (data.deliverStatus == "O") {
                            sts = "배송시작";
                            vm.statusBtnshow = false;
                            vm.statusFinishBtnshow = true;
                        } else if (data.deliverStatus == "E") {
                            sts = "배송완료";
                            vm.statusBtnshow = false;
                            vm.statusFinishBtnshow = false;
                        }
                        vm.deliverStatusText = sts;
                        vm.name = data.name;
                        vm.wh_nm = data.wh_id_ship;
                        vm.wh_id = data.deliv_wh_id;
                        vm.address = data.address;
                        vm.dtAddress = data.dtAddress;
                    }
                })
                .catch(function (error) {
                    alert("에러! API 요청에 오류가 있습니다. " + error);
                });
        },
        statusClick: function () {
            let vm = this;
            let params = new URLSearchParams();
            let deliverStatusUd = vm.dl_status == "U" ? "O" : "E";
            params.append("deliv_id",vm.deliv_id);
            params.append("dl_status",deliverStatusUd);
            params.append("pur_cnt",vm.pur_cnt);
            params.append("sales_id",vm.sales_id);
            params.append("wh_id",vm.wh_id);
            params.append("deliverStatus",vm.dl_status);
            this.axios
                .post("/dlm/saveDeliOrder.do", params)
                .then(function (response) {
                    if (response.data.result == "SUCCESS") {
                        alert("등록 완료");
                    }
                })
                .catch(function (error) {
                    alert("에러! API 요청에 오류가 있습니다. " + error);
                });
        },
        closeModal: function () {
        },
    },
    mounted() {
        this.detail();
    },
};
</script>