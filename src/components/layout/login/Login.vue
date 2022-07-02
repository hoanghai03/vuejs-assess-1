<template>
  <div class="m-container-login">
    <div class="m-dialog m-dialog-show">
      <div class="m-modal"></div>
      <div class="dialog">
        <label for="username">Tên đăng nhập</label>
        <input id="username" type="text" class="m-input" name="username" />
        <label for="password">Mật khẩu</label>
        <input id="password" type="text" class="m-input" name="password" />
        <br>
        <br>
        <br>
        <button class="m-btn pos-btn" @click="login()">Đăng nhập</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Login",
    methods: {
        /**
         * chức năng đăng nhập
         * nhhai2 25/6/2022
         */
        login(){
            
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
