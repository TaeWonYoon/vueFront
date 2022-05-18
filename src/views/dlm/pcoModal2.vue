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
                        <input type="text" class="inputTxt p100" v-model="returnId" readonly="readonly"/>
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
                        업체명 <span class="font_red">*</span>
                    </th>
                    <td>
                        <input type="text" class="inputTxt p100" v-model="mfcomp" readonly="readonly"/>
                    </td>
                    <th scope="row">
                        반품상태 <span class="font_red">*</span>
                    </th>
                    <td>
                        <input type="text" class="inputTxt p100" readonly="readonly"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        수량 <span class="font_red">*</span>
                    </th>
                    <td colspan="3">
                        <input type="text" class="inputTxt p100" v-model="return_cnt" readonly="readonly"/>
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
                        <input type="text" class="inputTxt p100" name="totalPrice" readonly="readonly" v-model="totalPrice"/>
                    </td>
                </tr>
                <tr>					
                    <th scope="row">
                        구분 <span class="font_red">*</span>
                    </th>
                    <td colspan="3">
                        <input type="text" class="inputTxt p100" name="status" readonly="readonly" v-model="status"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="btn_areaC mt30">
            <a class="btnType blue" @click="statusClick()" v-show="btnSaveDeliOrder"  ><span>반품완료</span></a> 
            <a class="btnType gray" ><span>닫기</span></a>
        </div>
    </div>
</template>

<script>
import twLib from "../../assets/js/twLib";
    export default {
        props: { returnId : String } ,
        data() {
            return {
                sales_nm : "",
                mfcomp : "",
                deliverStatus : "",
                return_cnt : "",
                totalPrice : 0,
                price : 0,
                btnSaveDeliOrder : false,
                status : "반품",
            }
        },
        methods: {
            detail2: function () {
            let vm = this;

            let params = new URLSearchParams();
            params.append("return_id", this.returnId);
            params.append("viewText", this.viewText);
            // vm.$log("return_id",this.returnId)
            // vm.$log("viewText",this.viewText)
            this.axios
                .post("/dlm/selectPurchaseReturn.do", params)
                .then(function (response) {     
                    if(response.data.result == "SUCCESS") {
                        let data = response.data.purchasereturnModel2;
                        vm.$log("data",data)
                        vm.sales_nm = data.sales_nm;
                        vm.mfcomp = data.mfcomp;
                        vm.return_cnt = data.return_cnt;
                        vm.price = vm.$nfm(data.price);
                        vm.totalPrice = vm.$nfm(data.return_cnt * data.price);
                    }
                })
                .catch(function (error) {
                    alert("에러! API 요청에 오류가 있습니다. " + error);
                });
        },
        statusClick: function () {
        }
    },
    mounted() {
        this.detail2();
    }
}
</script>