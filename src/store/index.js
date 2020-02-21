import Vue from 'vue';
import Vuex from 'vuex';
import createVuexAlong from "vuex-along";

Vue.use(Vuex);

const state = {
    langArr: []
}

const mutations = {
    setLangArr(state, arr) {
        state.langArr = arr;
    },
}

const getters = {
}

const actions = {
}

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    plugins: [
        createVuexAlong({
            // 设置保存的集合名字，避免同站点下的多项目数据冲突
            name: "Billum-vuex-along"
        }),
    ]
})

export default store