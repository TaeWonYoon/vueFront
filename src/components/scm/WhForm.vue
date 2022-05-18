<template>
<div id="formwrap" class="bts">
	
	<table id="formtable">
		<tr>
			
				<td>창고코드</td>
				<td>
					<input type="text" v-model='info.wh_id' class="form-control">
				</td>
				<td>창고명</td>
				<td>
					<input type="text" class="form-control" v-model='info.wh_nm'>
				</td>
			
				<td>창고위치</td>
				<td>
					<select id="location" class="form-control">
                        <option v-for='items in locationList' :key="items.idx">{{items.dtl_cod_nm}}</option>
                    </select>
				</td>
			
		</tr>
		
		<tr>
			<td>담당자</td>
			<td>
                    <select id="advisor" name="loginID">
                        <option v-fr='item in advisorList' :key="item.dtl_cod">{{items.dtl_cod_nm}}</option>
                    </select>
			</td>
			<td>전화번호</td>
			<td>
				<div class="form-inline" id="phoneArea">
					<input type="text" class="form-control" v-model='adv.phone.p-head' readonly>
					<span>-</span>
					<input type="text" class="form-control" id="p-mid" name="p_mid" readonly>
					<span>-</span>
					<input type="text" class="form-control" id="p-end" name="p_end" readonly>
				</div>
			</td>
		</tr>
		
		<tr>
			<td>이메일</td>
			<td colspan="3">
				<input type="text" class="form-control" v-model='info.email' readonly>
			</td>
		
		</tr>
		
		<tr>
			<td>우편번호</td>
			<td colspan="3">
				<div class="form-inline">
					<input type="text" class="form-control" v-model='info.zipCode'>

					<input type="button" id="findAddress" class="btn" value='주소찾기' @click='findZip'>
				</div>
			</td>
		</tr>
		<tr>
			<td>주소</td>
			<td colspan="3">
				<input type="text" class="form-control" v-model='info.addr'>
			</td>
		</tr>
		<tr>
			<td>상세주소</td>
			<td colspan="3">
				<input type="text" class="form-control"  v-model='info.dtAddress'>
			</td>
		</tr>
		
		
		
	
	
	</table>
	
	<div class="btnMngWareHouseArea text-center mt30" style="margin-bottom: 50px;">

        <button type="button" class="btn btn-primary mx10" id="btnRegister" v-if='action=="NEW"' @click='manage("POST")'>등록</button>
    
        <template v-if='action=="INFO"'>
            <button type="button" class="btn btn-primary mx10" @click='manage("POST",info.wh_id)'>저장</button>
            <button type="button" class="btn btn-danger mx10" @click='manage("DELETE",info_wh_id)'>삭제</button>
        </template>
        <button type="button" class="btn mx10" id="close">취소</button>
	</div>
	
	
	<!-- POST POP UP MODAL -->
	<div id="daumFindZipCodeArea">
		<div id="zipFrame" style="position:absolute; z-index:10; display:none;">
			<img src="@/assets/images/admin/comm/btn_close.png" id="btn-close-daum">
		</div>
	</div>
	
	


</div>
    

</template>

<script>
export default {
    data: function () {
        return {
            test: 1,
        };
    },
};
</script>