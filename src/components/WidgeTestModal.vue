<template>
    <div class="about">
        <input
            type="hidden"
            id="noticeNo"
            name="noticeNo"
            value="${noticeNo}"
        />
        <!-- 수정시 필요한 num 값을 넘김  -->

        <dl>
            <dt>
                <strong>{{ title }}</strong>
            </dt>
            <dd class="content">
                <!-- s : 여기에 내용입력 -->
                <table class="row">
                    <caption>
                        caption
                    </caption>

                    <tbody>
                        <tr>
                            <th scope="row">
                                작성자 <span class="font_red">*</span>
                            </th>
                            <td>
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="loginId"
                                    id="loginId"
                                    v-model="loginId"
                                    v-bind:disabled="loginIdread === 1"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                제목 <span class="font_red">*</span>
                            </th>
                            <td colspan="3">
                                <input
                                    type="text"
                                    class="inputTxt p100"
                                    name="noticeTitle"
                                    id="noticeTitle"
                                    v-model="noticeTitle"
                                    v-bind:disabled="noticeTitleread === 1"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">내용</th>
                            <td colspan="3">
                                <textarea
                                    class="inputTxt p100"
                                    name="noticeContent"
                                    id="noticeContent"
                                    v-model="noticeContent"
                                    v-bind:disabled="noticeContentread === 1"
                                >
                                </textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- e : 여기에 내용입력 -->

                <div class="btn_areaC mt30">
                    <a
                        class="btnType gray"
                        @click="noticesave"
                        id="btnClose"
                        name="btn"
                        ><span>저장</span></a
                    >
                </div>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
    // Hwang.vue에서 넘겨 준 title과 no를 받아옴
    // vue에서는 받아온 변수를 methods에서 직접 핸들링이 불가능하기 때문에
    // 임시 변수를 만들어서 받아온 변수를 넣어 줘야 함
    props: { title: String, no: String },
    data: function () {
        return {
            noticeNo: this.no,
            loginId: "",
            noticeTitle: "",
            noticeContent: "",
            loginIdread: 1,
            noticeTitleread: 1,
            noticeContentread: 1,
            action: "",
        };
    },
    computed: {
        ano: {
            get: function () {
                return this.data.noticeNo;
            },
            set: function (v) {
                this.data.noticeNo = v;
            },
        },
    },
    // html 로딩, 가상 dom 실행, 이 두 개 연결 시 작동
    mounted: function () {
        this.readdate();
    },
    methods: {
        closepop: function () {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            return false; //Modal will not be closedconsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        },
        readdate: function () {
            if (this.noticeNo == null || this.noticeNo == "") {
                //this.$session.set("loginId", "admin");

                this.loginId = "admin";
                this.noticeTitle = "";
                this.noticeContent = "";
                this.loginIdread = 1;
                this.noticeTitleread = 0;
                this.noticeContentread = 0;

                this.action = "I";
            } else {
                var params = new URLSearchParams(); // axios 사용하려고 params에 집어 던지기
                params.append("noticeNo", this.noticeNo);

                this.axios
                    .post("/system/detailNotice.do", params)
                    .then((response) => {
                        //this.view = response;
                        console.log(response);
                        console.log(
                            "response.data.resultMsg : " +
                                response.data.resultMsg
                        );
                        console.log(
                            "response.data.loginId : " +
                                response.data.result.loginId
                        );
                        console.log(
                            "response.data.noticeTitle : " +
                                response.data.result.noticeTitle
                        );
                        console.log(
                            "response.data.noticeContent : " +
                                response.data.result.noticeContent
                        );
                        //this.items = response.data.result;

                        //this.$data.loginId = response.data.result.loginId;

                        this.loginId = response.data.result.loginId; //   오류 나는 부분
                        this.noticeTitle = response.data.result.noticeTitle;
                        this.noticeContent = response.data.result.noticeContent;
                        this.loginIdread = 1;
                        this.noticeTitleread = 0;
                        this.noticeContentread = 0;

                        this.action = "U";

                        console.log(this.loginId);
                        console.log(this.noticeTitle);
                        console.log(this.noticeContent);
                    })
                    .catch(function (error) {
                        console.log(
                            "에러! API 요청에 오류가 있습니다. " + error
                        );
                    });
            }
        },
        noticesave: function () {
            var params = new URLSearchParams();
            // insert할 때 쿼리문이나 변수와 이름을 동일시하게 해 줘야 함
            params.append("noticeNo", this.noticeNo);
            params.append("loginId", this.loginId);
            params.append("noticeTitle", this.noticeTitle);
            params.append("noticeContent", this.noticeContent);
            params.append("action", this.action); // "I"나 "U"도 넘겨 줌

            this.axios
                .post("/system/noticeSave.do", params)
                .then((response) => {
                    //this.view = response;
                    console.log(response);

                    let msg = response.data.resultMsg;

                    if (msg != "UPDATED" && msg != "UPDATED") {
                        alert(msg);
                    } else {
                        alert("저장 되었습니다.");
                    }
                })
                .catch(function (error) {
                    console.log("에러! API 요청에 오류가 있습니다. " + error);
                });
        },
    },
};
</script>
