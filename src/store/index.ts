import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* Navigation Drawers */
    isSideMenuVisible: true,
    isSettingsMenuVisible: false,
    isNotificationVisible: false,
    notificationText: '',
  },
  mutations: {
    toggleSidebar(state, payload) {
      state.isSideMenuVisible = payload.value;
    },

    toggleSettings(state, payload) {
      state.isSettingsMenuVisible = payload.value;
    },

    toggleNotifications(state, payload) {
      state.isNotificationVisible = payload.value;
      state.notificationText = payload.message;
    },
  },
  actions: {
  },
  modules: {
  },
});
