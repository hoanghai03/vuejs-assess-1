import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify'
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
// import view 
import CustomerList from './view/customer/CustomerList.vue'
import EmployeeList from './view/employee/EmployeeList.vue'
import StudentList from './view/student/StudentList.vue'
import Money from './view/money/Money.vue'
import Login from './components/layout/login/Login.vue'
import Process from './view/money/process/Process.vue'
import Payment from './view/money/payment/Payment.vue'
import Supplier from './view/money/process/supplier/Supplier.vue'
import Account from './view/money/process/account/Account.vue'
import MainLayout from './components/layout/mainLayout.vue'
import PaymentDetail from "./view/money/payment/PaymentDetail.vue";
import TheHeader from "./components/layout/user/TheHeader.vue";
import TheNavbar from "./components/layout/user/TheNavbar.vue";
import TheContent from "./components/layout/user/TheContent.vue";

Vue.component("PaymentDetail", PaymentDetail);
Vue.component("Login", Login);
Vue.component("MainLayout", MainLayout);

Vue.use(VueToast);
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.config.productionTip = false


const routers = [{
        path: '/app',
        components: {
            default: TheNavbar,
            'theheader': TheHeader,
            'thecontent': TheContent
        },
        children: [{
                path: 'customer',
                component: CustomerList
            },
            {
                path: 'employee',
                component: EmployeeList
            },
            {
                path: 'student',
                component: StudentList
            },
            {
                path: 'money',
                component: Money,
                children: [{
                        path: 'process',
                        component: Process
                    },
                    {
                        path: 'payment',
                        component: Payment
                    }
                ]
            },
            {
                path: 'supplier',
                component: Supplier
            },
            {
                path: 'account',
                component: Account
            },
            {
                path: 'login',
                component: Login
            }
        ]
    },
    {
        path: '/login',
        component: Login
    }

]

const router = new VueRouter({
        routes: routers,
        mode: 'history'
    })
    // router.push('/app/money/process')
new Vue({
    render: h => h(App),
    vuetify,
    router
}).$mount('#app')