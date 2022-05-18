<template>
    <div class="modalList">
        <input type="hidden" id="accno" name="accno" value="${accno}" />
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
                                <input
                                    type="radio"
                                    class="radiobtn"
                                    value="1"
                                    name="radiochoice"
                                    id="radiochoice"
                                    v-model="accyn"
                                />승인&nbsp;&nbsp;
                                <input
                                    type="radio"
                                    class="radiobtn"
                                    value="2"
                                    name="radiochoice"
                                    id="radiochoice"
                                    v-model="accyn"
                                />반려&nbsp;&nbsp;
                            </td>
                        </tr>
                    </tbody>
                    <!-- tbody 끝 -->
                </table>

                <div class="btn_areaC">
                    <a
                        class="btnType blue"
                        @click="fnDisorAgreeCod()"
                        name="btn"
                    >
                        <span>확인</span>
                    </a>
                </div>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
    props: { title: String, accNo: String },
    data: function () {
        return {
            accno: this.accNo,
            accyn: "",
            action: "U",
        };
    },
    methods: {
        fnDisorAgreeCod: function () {
            var params = new URLSearchParams();
            var truefalse = confirm("처리하시겠습니까?");
            if (truefalse == true) {
                if (this.accyn == "1") {
                    params.append("accyn", this.accyn);
                } else {
                    params.append("accyn", this.accyn);
                }
            } else {
                alert("취소되었습니다.");
                this.$router.go();
            }
            params.append("accno", this.accno);
            params.append("action", this.action);
            console.log("승인 및 반려값: " + params);
            console.log("this만 찍은 값: " + this.accyn);
            this.axios
                .post("/adm/updateAgree.do", params)
                .then((response) => {
                    console.log(
                        "승인 및 반려 결과값: " + response.data.resultMsg
                    );
                    alert("처리되었습니다.");
                    this.$router.go();
                })
                .catch(function (error) {
                    console.log("에러! API 요청에 오류가 있습니다. " + error);
                });
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
