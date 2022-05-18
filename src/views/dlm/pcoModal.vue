<template>
    <!-- 모달팝업 -->
    <div id="layer1" style="width: 600px">
    <!-- s : 여기에 내용입력 -->
        <table class="row">
            <caption>caption</caption>
        
            <colgroup>
                <col width="120px">
                <col width="*">
                <col width="120px">
                <col width="*">
            </colgroup>

            <tbody>
                
                <tr>
                    <th scope="row">
                        발주/반품 번호 <span class="font_red">*</span>
                    </th>
                    <td colspan="3">
                        <input type="text" class="inputTxt p100" v-model="orderId" readonly="readonly"/>
                        </td>		
                </tr>
                <tr>
                    <th scope="row">
                        제품명 <span class="font_red">*</span>
                    </th>
                    <td colspan="3">
                        <input type="text" class="inputTxt p100" v-model="sales_nm" readonly="readonly"/>
                    </td>							
                </tr>
                <tr>
                    <th scope="row">
                        고객명 <span class="font_red">*</span>
                    </th>
                    <td>
                        <input type="text" class="inputTxt p100" v-model="name" readonly="readonly"/>
                    </td>
                    <th scope="row">
                        발주 상태 <span class="font_red">*</span>
                    </th>
                    <td>
                        <input type="text" class="inputTxt p100" v-model="deliverStatus" readonly="readonly"/>
                        <input type="hidden" class="inputTxt p100" v-model="dl_status"  readonly="readonly" />
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        수량 <span class="font_red">*</span>
                    </th>
                    <td colspan="3">
                        <input type="text" class="inputTxt p100" v-model="order_cnt" readonly="readonly"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        금액 <span class="font_red">*</span>
                    </th>
                    <td colspan="3">
                        <input type="text" class="inputTxt p100" v-model="price" readonly="readonly"/>
                    </td>
                </tr>
                <tr>					
                    <th scope="row">
                        총액 <span class="font_red">*</span>
                    </th>
                    <td colspan="3">
                        <input type="text" class="inputTxt p100" v-model="totalPrice" readonly="readonly" />
                    </td>
                </tr>
                <tr>					
                    <th scope="row">
                        구분 <span class="font_red">*</span>
                    </th>
                    <td colspan="3">
                        <input type="text" class="inputTxt p100" v-model="status" readonly="readonly" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="btn_areaC mt30">
            <a class="btnType blue" @click="statusClick()" v-show="btnSaveDeliOrder"  ><span>반품완료</span></a> 
            <a class="btnType gray" @click="closeModal()"><span>닫기</span></a>
        </div>
    </div>
</template>

<script>
import twLib from "../../assets/js/twLib";
    export default {
        props: { orderId : String},
        data() {
            return {
                sales_nm : "",
                name : "",
                deliverStatus : "",
                dl_status : "",
                delverStatus : "",
                order_cnt : "",
                price : "",
                totalPrice : "",
                status: "발주"
            }
        },
        methods: {
            detail: function () {
            let vm = this;

            let params = new URLSearchParams();
            params.append("orderid", this.orderId);
            params.append("viewText", this.viewText);
            vm.$log("orderid",this.orderId)
            vm.$log("viewText",this.viewText)
            this.axios
                .post("/dlm/selectPurchaseOrder.do", params)
                .then(function (response) {     
                    vm.$log("response == " , response.data)
                    if(response.data.result == "SUCCESS") {
                        let data = response.data.purchaseorderModel;
                        vm.$log("data.",data);
                        vm.sales_nm = data.sales_nm;
                        vm.name = data.name;
                        vm.order_cnt = data.order_cnt;
                        vm.price = vm.$nfm(data.price)+"원";
                        
                        let totalPrice = (data.price * data.order_cnt);
                        vm.totalPrice = vm.$nfm(totalPrice) + "원"; //넘버 포멧 함수
                    }
                })
                .catch(function (error) {
                    alert("에러! API 요청에 오류가 있습니다. " + error);
                });
        },
    },
    mounted() {
        this.detail();
    }
}
</script>