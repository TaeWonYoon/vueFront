<template>
  <div id="background_board">
    <div class="login_form shadow" align="center">
      <div class="login-form-left-side">
        <fieldset>
          <legend>로그인</legend>
          <p class="id">
            <label for="user_id">아이디</label>
            <input
              type="text"
              id="EMP_ID"
              name="lgn_Id"
              placeholder="아이디"
              style="ime-mode: inactive"
              v-model="loginId"
            />
          </p>
          <p class="pw">
            <label for="user_pwd">비밀번호</label>
            <input
              type="password"
              id="EMP_PWD"
              name="pwd"
              placeholder="비밀번호"
              onfocus="this.placeholder=''; return true"
              v-model="password"
            />
          </p>
        </fieldset>
        <div class="btn_loginArea">
          <a class="btnType blue" @click="loginact()"><span>Login</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { title: String },
  data: function () {
    return {
      loginId: "",
      password: "",
    };
  },
  methods: {
    loginact: function () {
      var params = new URLSearchParams();
      params.append("lgn_Id", this.loginId);
      params.append("pwd", this.password);

      this.axios
        .post("/loginProc.do", params)
        .then((response) => {
          //this.view = response;

          if (response.data.result == "SUCCESS") {
            this.$session.set("loginId", response.data.loginId);
            this.$session.set("userNm", response.data.userNm);
            this.$session.set("userType", response.data.userType);
            this.$session.set("serverName", response.data.serverName);
            this.$session.set("usrMnuAtrt", response.data.usrMnuAtrt);

            
          } else {
            alert("ID/Password 확인해주세요.");
          }


          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

          //this.$parent.$el.setlist(this.$session.get("usrMnuAtrt"));
          // this.$parent.$forceUpdate();
        })
        .catch(function (error) {
          console.log("에러! API 요청에 오류가 있습니다. " + error);
        });

        // it is same as this callAjax
        // callAjax('loginProc.do','post','json',true,params,(callback : inner "then" quote does))
        // see compare => axios.post("loginProc.do",param) : method = post, param = param, url = "loginProc.do"
        //                     .then( (response)=>{codes...} ) : success:function(response){ codes... }
        //                     .catch( function(error){ codes... } ) : error:function(error) {codes... }
        // no datatype : auto json
        // contentType and globalProperties of name "axios" => main.js

        //commit test// test//


    },

    closepop: function () {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

      //this.$parent.$el.setlist(this.$session.get("usrMnuAtrt"));
      //this.$parent.$forceUpdate();

      return false; //Modal will not be closedconsole.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    },
  },
};
</script>
