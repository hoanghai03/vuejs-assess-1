<template>
  <div class="m-container-login">
    <div class="m-dialog m-dialog-show">
      <div class="m-modal"></div>
      <div class="dialog">
        <label for="username">Tên đăng nhập</label>
        <input id="username" type="text" class="m-input" name="username" v-model="user.username"/>
        <label for="password">Mật khẩu</label>
        <input id="password" type="text" class="m-input" name="password" v-model="user.password"/>
        <br>
        <br>
        <br>
        <button class="m-btn pos-btn" @click="loginForm">Đăng nhập</button>
        <div v-if="checkLogin && !$store.getters.isAuthenticated" :style="{ 'color':  'red' }">Tài khoản hoặc mật khẩu không đúng</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "Login",
    data() {
      return {
        user : {
          username : null,
          password: null
          
        },
        checkLogin : false
      }
    },
    methods: {
      ...mapActions(['login']),
        /**
         * chức năng đăng nhập
         * nhhai2 25/6/2022
         */
        async loginForm(){
            try {
              // gọi đến hàm login trong file auth.js
              await this.login(this.user);
              // hiển thị trạng thái đã đăng nhập
              this.checkLogin = true;
              // chuyển hướng 
              this.$router.push('app')
            } catch (error) {
              console.log('lỗi ở form login');              
            }
        }
    },
};
</script>

<style scoped>
@import url("../../../style/main.css");
@import url("../../../style/component/dialog.css");
.dialog {
    width: 500px !important;
    height:  300px !important;
    margin-top: calc(50vh - 170px);
    margin-left: calc(50vh - 120px);
    padding: 60px 40px;
}
.pos-btn {
    right: 40px;
    position: absolute;
}
</style>
