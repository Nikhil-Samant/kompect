import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* Navigation Drawers */
    isSideMenuVisible: true,
    isSettingsMenuVisible: false,
  },
  mutations: {
    toggleSidebar(state: any, payload) {
      state.isSideMenuVisible = payload.value;
    },

    toggleSettings(state: any, payload) {
      state.isSettingsMenuVisible = payload.value;
    },
  },
  actions: {
  },
  modules: {
  },
});
