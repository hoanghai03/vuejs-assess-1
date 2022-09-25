<template>
  <div class="m-container-login">
    <div class="m-dialog m-dialog-show">
      <div class="m-modal"></div>
      <div class="dialog">
        <label for="username">Tên đăng nhập</label>
        <input id="username" type="text" class="m-input" name="username" v-model="user.username" />
        <label for="username">Email</label>
        <input id="username" type="text" class="m-input" name="username" v-model="user.email" />
        <label for="password">Mật khẩu</label>
        <input id="password" type="text" class="m-input" name="password" v-model="user.password" />
        <label for="password">Nhập lại mật khẩu</label>
        <input id="password" type="text" class="m-input" name="password" v-model="user.enterThePassword" />
        <br />
        <br />
        <br />
        <router-link to="login">Quay lại trang đăng nhập</router-link>
        <button class="m-btn pos-btn" @click="registerForm">Đăng ký</button>
        <div v-if="!registerFailed" :style="{ color: 'red' }">Mật khẩu không trùng khớp</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      registerFailed: true,
      user: {
        username: null,
        password: null,
        enterThePassword: null,
        email: null
      },
    };
  },
  methods: {
    ...mapActions(["register"]),
    /**
     * Phương thức đăng nhập
     */
    async registerForm() {
      // validate form
      if (this.validateForm()) {
        // gọi hàm đăng ký
        await this.register(this.user);
      }
    },

    /**
     * Đăng ký
     * @param {*} param0
     * @param {*} user
     */
    async register(user) {
      await axios.post(process.env.VUE_APP_BASE_URL + "/auth/register", user).then((res) => {
        if (res.data.success) {
          alert("Đăng nhập thành công");
          // chuyển hướng
          this.$router.push("login");
        } else alert(res.data.validateInfo[0].errorMessenge);
      });
    },
    /**
     * Hàm validate form
     */
    validateForm() {
      if (this.user.password && this.user.enterThePassword && this.user.password == this.user.enterThePassword) {
        this.registerFailed = true;
        return true;
      }
      this.registerFailed = false;
      return false;
    },
  },
};
</script>

<style scoped>
@import url("../../../style/main.css");
@import url("../../../style/component/dialog.css");
.dialog {
  width: 500px !important;
  height: 300px !important;
  margin-top: calc(50vh - 170px);
  margin-left: calc(50vh - 120px);
  padding: 60px 40px;
}
.pos-btn {
  right: 40px;
  position: absolute;
}
</style>
