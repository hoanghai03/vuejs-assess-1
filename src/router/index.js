import Vue from 'vue'
import VueRouter from 'vue-router'

// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
// import view 
import CustomerList from '../view/customer/CustomerList.vue'
import EmployeeList from '../view/employee/EmployeeList.vue'
import StudentList from '../view/student/StudentList.vue'
import Money from '../view/money/Money.vue'
import Login from '../components/layout/login/Login.vue'
import Register from '../components/layout/Register/Register.vue'
import Process from '../view/money/process/Process.vue'
import Payment from '../view/money/payment/Payment.vue'
import Supplier from '../view/money/process/supplier/Supplier.vue'
import Account from '../view/money/process/account/Account.vue'
import TheHeader from "../components/layout/user/TheHeader.vue";
import TheNavbar from "../components/layout/user/TheNavbar.vue";
import TheContent from "../components/layout/user/TheContent.vue";
import store from '../store'
// Vue.component("Login", Login);

Vue.use(VueRouter)


const routers = [
    // {
    //     path: '/',
    //     redirect: () => {
    //         return '/login';
    //     }
    // },
    {
        path: '/app',
        components: {
            default: TheNavbar,
            'theheader': TheHeader,
            'thecontent': TheContent
        },
        meta: { requiresAuth: true },
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
        component: Login,
        meta: { guest: true }
    },
    {
        path: '/register',
        component: Register,
        meta: { guest: true }
    }

]


const router = new VueRouter({
        routes: routers,
        mode: 'history'
    })
    // router.push('login')
router.beforeEach((to, from, next) => {
    if (to.matched.some(value => value.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next();
            return;
        } else next('login');
    } else next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(value => value.meta.guest)) {
        if (store.getters.isAuthenticated) {
            next();
            return;
        }
        next();
    } else next();
});

export default router