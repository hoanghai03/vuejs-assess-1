import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify'
import VueToast from 'vue-toast-notification';
import router from './router/index'
// import axios from "axios";
// import Role from './models/role'
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
// import view 
import MainLayout from './components/layout/mainLayout.vue'
import PaymentDetail from "./view/money/payment/PaymentDetail.vue";
import VueJWT from 'vuejs-jwt'

Vue.use(VueJWT)
Vue.component("PaymentDetail", PaymentDetail);
Vue.component("MainLayout", MainLayout);
// Vue.use(Role);
Vue.use(VueToast);
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    vuetify,
    store,
    router
}).$mount('#app')