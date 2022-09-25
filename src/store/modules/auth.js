import axios from "axios";
import Enum from "../../script/enum";
// import VueJWT from 'vuejs-jwt'

const state = {
    admin: "" || null,
    user: "" || null,
    token: "" || null,
    refreshToken: "" || null,
    id: "" || null
};
const getters = {
    isAuthenticated: (state) => {
        return !!state.admin || !!state.user;
    },
    stateToken: (state) => state.token,
    stateRefreshToken: (state) => state.refreshToken,
    stateId: (state) => state.id
};
const actions = {
    /**
     * Hàm đăng nhập
     * @param {*} param0 
     * @param {*} account 
     */
    async login({ commit, dispatch }, account) {
        //in post request
        const auth = {
            headers: { "Content-Type": "application/json", Authorization: `` },
        };

        await axios.post(process.env.VUE_APP_BASE_URL + "/auth/login", account, auth).then(async(res) => {
            if (res.data.success) {
                if (res.data.role == Enum.Admin) {
                    await commit("setAdmin", account.username);
                } else await commit("setUser", account.username);
                await Promise.all([commit("setToken", res.data.token), commit("setRefreshToken", res.data.refreshToken), commit("setID", res.data.id)]);
                dispatch("doRefreshToken");
            } else {
                // set null tất cả các giá trị
                await dispatch("setNullAllState");
            }
        });
    },

    /**
     * Hàm đăng xuất
     * @param {*} param0 
     * @param {*} ID 
     */
    async logout({ dispatch }, ID) {
        //in post request
        const auth = {
            headers: { "Content-Type": "application/json", Authorization: `bearer ${this.getters.stateToken}` },
        };
        // logout xóa refresh token
        await axios.get(process.env.VUE_APP_BASE_URL + `/auth/logout?userID=${ID}`, auth).then((res) => {
            console.log(res);
        });
        // set null tất cả các giá trị
        await dispatch("setNullAllState");
    },

    /**
     * 
     * @param {*} param0 
     */
    async setNullAllState({ commit }) {
        await Promise.all([commit("setAdmin", null), commit("setUser", null), commit("setToken", null), commit("setRefreshToken", null)]);
    },

    /**
     * refresh token 
     * @param {*} param0 
     */
    async doRefreshToken({ commit }) {
        var me = this
        const isRefreshToken = setInterval(async() => {
            await axios.get(process.env.VUE_APP_BASE_URL + `/auth/get-token?refreshToken=${me.getters.stateRefreshToken}&ID=${me.getters.stateId}`).then(async(res) => {
                if (res.succes) { await commit("setToken", res.data); } else clearInterval(isRefreshToken);
            });
        }, 10000);
    },
};
const mutations = {
    setAdmin(state, username) {
        state.admin = username;
    },
    setUser(state, username) {
        state.user = username;
    },
    setToken(state, token) {
        state.token = token;
    },
    setRefreshToken(state, refreshToken) {
        state.refreshToken = refreshToken;
    },
    setID(state, id) {
        state.id = id;
    },
};
export default {
    state,
    actions,
    mutations,
    getters,
};