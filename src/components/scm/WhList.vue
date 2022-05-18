<template>


    <!-- SearchArea -->
    <div class="searchArea">
        <table style="margin-top: 10px" width="100%" cellpadding="5" cellsapcing="0" border="1">
        <tr style="border: 0px; border-color: blue">
            <td width="80" height="25" style="font-size: 120%;">&nbsp;&nbsp;</td>
            <td width="50" height="25" style="font-size: 100%; text-align:left; padding-right:25px;">
                <select v-model="param.searchType" style="width: 150px;">
                        <option value="all">전체</option>
                        <option value="wh_nm" >창고명</option>
                        <option value="wh_loc" >창고 위치</option>
                </select>
                
    
                <input v-model="param.keyword" type="text" style="width: 300px; height: 25px;">
                
                
                <div class="bts btnMngWareHouseArea" id="searchBtnWrap">
                    <button type="button" class="btn btn-primary" @click="getList()">검색</button>
                </div>                 
                
                </td> 
            </tr>
        </table>
    </div>

    
    <!--List Area -->
    <div id="whListArea" class="bts">

       

        <div class="text-right btnMngWareHouseArea">
            <button type="button" class="btn btn-primary" id="btnRegNew" @click='getForm("NEW")'>창고 등록</button>
        </div>

        

        <div class="bts mt30">
            <table class="col" id="salesListTable">

                <thead>
                    <tr>
                        <th scope="col">창고 코드</th>
                        <th scope="col">창고명</th>
                        <th scope="col">담당자</th>
                        <th scope="col">이메일</th>
                        <th scope="col">전화 번호</th>
                        <th scope="col">우편번호</th>
                        <th scope="col">창고 위치</th>
                    </tr>
                </thead>

                <tbody v-if="salesList.length==0">
                    <tr>
                        <td colspan="7" class="text-center">등록된 창고가 없습니다</td>
                    </tr>
                </tbody>
                <tbody v-else v-for='item in salesList' :key='item.wh_id'>
            
                    <tr @click='getForm("INFO",item.wh_id)'>
                        <td @click='getWhInfo(item.wh_id)'>{{item.wh_id}}</td>
                        <td>{{item.wh_nm}}</td>
                        <td>{{item.loginID}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.zipCode}}</td>
                        <td>{{item.wh_loc}}</td>
                    </tr>
                </tbody>

            </table>	
        </div>
    </div>
    <!-- <WhForm></WhForm> -->
</template>



<script>
   // import WhForm from "@/components/scm/WhList.vue";
    export default{
        data:()=>{
            return{
                param:{
                    selectPage:1,
                    rowsPerPage:5,
                    totalCount:0,
                    totalPage:'',
                    keyword:'',
                    searchType:'all'
                },
                salesList:[],
                locationList:[],
                advisorList:[]
            };
        },
        // components:{WhForm},
        mounted:()=>{
            //console.log('initiate warehouselist');
            // this.getList();  
        },
        methods:{
           
            getList:function(){
                this.axios
                    .post("/scm/vue/whlist",new URLSearchParams(this.param))
                    .then((resp)=>{
                        let data=resp.data;
                        this.param={
                            selectPage:data.page.selectPage,
                            rowsPerPage:data.page.rowsPerPage,
                            totalCount:data.page.totalCount,
                            totalPage:data.page.totalPage,
                            keyword:data.page.keyword,
                            searchType:data.page.searchType
                        }
                        this.salesList=data.page.whList;
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
            },
            

        }
    }
</script>

<style>
	.searchArea{
		margin-top: 35px;
	    padding: 50px 0;
	    border: 2px solid rgb(190,190,190);
	}
	#searchBtnWrap{
		display: inline-block;
		margin: 0 10px;
	}
	#whListArea{
		margin-bottom:30px;
	}
	#whListArea table, #whInfoArea table{
		margin:0 auto;
		
	}

	#btn-close-daum{
		position:absolute;
		right:0;
	    bottom: 0;
	    z-index: 11;
	    cursor: pointer;
		
	}
	
	
	#formwrap{
		margin-top: 50px;
		margin-bottom:50px;
		border: 2px solid rgb(190,190,190);
		padding-left:50px;
		
	}
	#formwrap #formtable{
		border-collapse: separate;
		border-spacing: 10px 10px;
		margin:10px auto;
	}
	#formwrap #phoneArea input{
		width: 100px;
	}
	

</style>