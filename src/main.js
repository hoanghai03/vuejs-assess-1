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
import Process from './view/money/process/Process.vue'
import Payment from './view/money/payment/Payment.vue'
import Supplier from './view/money/process/supplier/Supplier.vue'
import Account from './view/money/process/account/Account.vue'

import ZkTable from 'vue-table-with-tree-grid'

Vue.use(ZkTable)
Vue.use(VueToast);
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.config.productionTip = false


const routers = [{
        path: '/customer',
        component: CustomerList
    },
    {
        path: '/employee',
        component: EmployeeList
    },
    {
        path: '/student',
        component: StudentList
    },
    {
        path: '/money',
        component: Money,
        children: [{
                path: 'process',
                component: Process,
            },
            {
                path: 'payment',
                component: Payment
            }
        ]
    },
    {
        path: '/supplier',
        component: Supplier,
    },
    {
        path: '/account',
        component: Account,
    }
]

const router = new VueRouter({
    routes: routers,
    mode: 'history'
})
new Vue({
    render: h => h(App),
    vuetify,
    router
}).$mount('#app')