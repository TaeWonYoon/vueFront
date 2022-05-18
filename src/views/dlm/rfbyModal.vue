<template>
    <!-- 모달팝업 -->
		<dl>
			<dt>
				<strong>반품지시서 상세</strong>
			</dt>
			
			<dd class="content">
			
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
							<th scope="row">반품번호 <span class="font_red">*</span></th>
							<td colspan="3">
								<input type="hidden" v-model="deliverStatus" >
								<input type="hidden" v-model="deliv_id" >
								<input type="hidden" v-model="wh_id" >
								<input type="text" class="inputTxt p100" v-model="return_id" />
								<input type="hidden" class="inputTxt p100" v-model="rfinfo_id" />
							</td>		
						</tr>
						<tr>
							<th scope="row">제품명 <span class="font_red">*</span></th>
							<td colspan="3">
								<input type="text" class="inputTxt p100" v-model="sales_nm"/>
								<input type="hidden" class="inputTxt p100" v-model="sales_id" />
							</td>							
						</tr>
						<tr>
							<th scope="row">수량 <span class="font_red">*</span></th>
							<td colspan="3"><input type="text" class="inputTxt p100" v-model="pur_cnt" /></td>
						</tr>
						<tr>
							<th scope="row">고객명 <span class="font_red">*</span></th>
							<td colspan="3"><input type="text" class="inputTxt p100" v-model="client"/></td>
						</tr>
						<tr>
							<th scope="row">반품담당자 <span class="font_red">*</span></th>
							<td><input type="text" class="inputTxt p100" v-model="name" /></td>
							<th scope="row">반품상태 <span class="font_red">*</span></th>
							<td>
								<input type="text" class="inputTxt p100"
								 	v-model="deliverStatus" />
							</td>
						</tr>
						<tr>					
							<th scope="row">출발창고지 <span class="font_red">*</span></th>
							<td colspan="3"><input type="text" class="inputTxt p100" v-model="wh_nm"  /></td>
						</tr>
						<tr>					
							<th scope="row">주소1 <span class="font_red">*</span></th>
							<td colspan="3"><input type="text" class="inputTxt p100" v-model="address"  /></td>
						</tr>
						<tr>					
							<th scope="row">주소2 <span class="font_red">*</span></th>
							<td colspan="3"><input type="text" class="inputTxt p100" v-model="dtAddress" /></td>
						</tr>
<!-- 						<tr> -->
<!-- 							<th scope="row">반품상태 수정<span class="font_red">*</span></th> -->
<!-- 							<td colspan="3"> -->
<!-- 								<input type="radio" id="radio1-1" name="deliverStatus" id="deliverStatus_1" value='U' style="margin-left: 10px;"/> <label for="radio1-1" >반품준비</label> -->
<!-- 								<input type="radio" id="radio1-2" name="deliverStatus" id="deliverStatus_2" value="O" style="margin-left: 10px;"/> <label for="radio1-2" >반품시작</label> -->
<!-- 								<input type="radio" id="radio1-3" name="deliverStatus" id="deliverStatus_3" value="E" style="margin-left: 10px;"/> <label for="radio1-3" >반품완료</label>			 -->
<!-- 							</td> -->
<!-- 						</tr> -->
					</tbody>
				</table>

				<!-- e : 여기에 내용입력 -->

				<div class="btn_areaC mt30">
					<a class="btnType blue" @click="statusClick()" v-show="btnSaveDeliOrder"  ><span>반품완료</span></a> 
					<a class="btnType gray" @click="closeModal()"><span>닫기</span></a>
				</div>
			</dd>
		</dl>
		<a href="" class="closePop"><span class="hidden">닫기</span></a>
	<!-- // 모달팝업 -->
</template>

<script>
import twLib from "../../assets/js/twLib";
import VueSession from 'vue-session';
import Vue from 'vue';
export default {
    props : { return_id : String},
    data: function() {
        return {
            sales_id : "",
            sales_nm : "",
            client : "",
            rfinfo_id : "",
            dtAddress : "",
            address : "",
            wh_nm : "",
            wh_id : "",
            deliv_id : "",
            deliverStatus : "",
            name : "",
            pur_cnt : 0,
            btnSaveDeliOrder : false
        }
    },
    methods: {
        detail: function () {
            let vm = this;

            let params = new URLSearchParams();
            params.append("return_id", this.return_id);
            this.axios
                .post("/dlm/detailRefund.do", params)
                .then(function (response) {
                    if(response.data.result == "SUCCESS") {
                        let data = response.data.refundModel;
                        vm.sales_id = data.sales_id;
                        vm.pur_cnt = data.return_cnt;
                        vm.client = data.client;
                        vm.rfinfo_id = data.rfinfo_id;
                        vm.dtAddress = data.dtAddress;
                        vm.address = data.address;
                        vm.wh_nm = data.wh_nm;
                        vm.wh_id = data.wh_id;
                        vm.deliv_id = data.deliv_id;
                        vm.sales_nm = data.sales_nm;
                        vm.name = vm.$session.get('loginInfo').userNm;
                        var deliverStatus = data.deliverStatus;
                        vm.deliverStatusData = data.deliverStatus;
                        if(deliverStatus=="U"){
                            vm.deliverStatus = "반품전";	//name속성 없음
                            vm.btnSaveDeliOrder = true;
                        }else if(deliverStatus=="E"){
                            vm.deliverStatus = "반품완료";	//name속성 없음
                            vm.btnSaveDeliOrder = false;
                        }
                        vm.$log("data.",data);
                    }
                })
                .catch(function (error) {
                    alert("에러! API 요청에 오류가 있습니다. " + error);
                });
        },
        statusClick: function() {

            let params = new URLSearchParams();
            params.append("pur_cnt", this.pur_cnt);
            params.append("sales_id", this.sales_id);
            params.append("wh_id", this.wh_id);
            params.append("deliv_id", this.deliv_id);
            params.append("return_id", this.return_id);
            params.append("deliverStatus", this.deliverStatusData);
            this.axios
                .post("/dlm/saveDeliReturn.do", params)
                .then(function (response) {
                    if(response.data.result == "SUCCESS") {
                        alert("반품이 완료 되었습니다.");
                    }
                })
                .catch(function (error) {
                    alert("에러! API 요청에 오류가 있습니다. " + error);
                });
        },
        closeModal: function() {
        }
    },
    mounted() {
        this.detail();
    }
}
</script>