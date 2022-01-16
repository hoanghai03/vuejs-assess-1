import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'

// import view 
import CustomerList from './view/customer/CustomerList.vue'
import EmployeeList from './view/employee/EmployeeList.vue'
import StudentList from './view/student/StudentList.vue'
import vuetify from './plugins/vuetify'

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