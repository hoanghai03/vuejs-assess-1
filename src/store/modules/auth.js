import axios from 'axios'
import Enum from '../../script/enum'

const state = {
    admin: null,
    user: null,
    token: null,
    refreshToken: null
}
const getters = {
    isAuthenticated: (state) => { return !!state.admin || !!state.user },
    stateToken: (state) => state.token,
    stateRefreshToken: (state) => state.refreshToken

}
const actions = {
    async login({ commit, dispatch }, account) {

        //in post request
        const auth = {
            headers: { 'Content-Type': 'application/json', 'Authorization': `` }
        }
        await axios.post(process.env.VUE_APP_BASE_URL + '/auth/login', account, auth)
            .then(async(res) => {
                if (res.data.success) {
                    if (res.data.role == Enum.Admin) {
                        await commit('setAdmin', account.username);
                    } else await commit('setUser', account.username);
                    await Promise.all([commit('setToken', res.data.token), commit('setRefreshToken', res.data.refreshToken)]);
                } else {
                    // set null tất cả các giá trị
                    await dispatch('setNullAllState');
                }
            });
    },
    async logout({ dispatch }, ID) {
        //in post request
        const auth = {
                headers: { 'Content-Type': 'application/json', 'Authorization': `bearer ${this.getters.stateToken}` }
            }
            // logout xóa refresh token
        await axios.get(process.env.VUE_APP_BASE_URL + `/auth/logout?userID=${ID}`, auth).then(res => { console.log(res); });
        // set null tất cả các giá trị
        await dispatch('setNullAllState');
    },
    async setNullAllState({ commit }) {
        await Promise.all([commit('setAdmin', null), commit('setUser', null), commit('setToken', null), commit('setRefreshToken', null)]);

    }
}
const mutations = {
    setAdmin(state, username) {
        state.admin = username
    },
    setUser(state, username) {
        state.user = username
    },
    setToken(state, token) {
        state.token = token
    },
    setRefreshToken(state, refreshToken) {
        state.refreshToken = refreshToken
    },
}
export default {
    state,
    actions,
    mutations,
    getters
}