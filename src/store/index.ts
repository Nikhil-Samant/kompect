import Vue from 'vue';
import Vuex from 'vuex';
import { defaultJpegSettings } from '../shared/model/JpegSettings';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* Navigation Drawers */
    isSideMenuVisible: true,
    isSettingsMenuVisible: false,
    notification: {
      isNotificationVisible: false,
      text: '',
      timeout: 3000,
    },
    imageSettings: [defaultJpegSettings],
  },
  mutations: {
    updateSidebar(state, sidebar) {
      state.isSideMenuVisible = sidebar.value;
    },

    updateSettings(state, settings) {
      state.isSettingsMenuVisible = settings.value;
    },

    updateNotifications(state, notifcations) {
      state.notification.isNotificationVisible = notifcations.value;
      state.notification.text = notifcations.message;
    },

    updateImageSetting(state, imageSetting) {
      const settingId: number = state.imageSettings.findIndex(
        n => n.name === imageSetting.name
      );
      state.imageSettings[settingId] = imageSetting;
    },
  },
  actions: {
    async toggleSidebar({ commit }, sidebar) {
      commit('updateSidebar', sidebar);
    },
    async toggleSettings({ commit }, settings) {
      commit('updateSettings', settings);
    },
    async toggleNotifications({ commit }, notifcations) {
      commit('updateNotifications', notifcations);
    },
    async updateNewImageSetting({ commit }, setting) {
      commit('updateImageSetting', setting);
    },
  },
  modules: {},
  getters: {
    isSidebarVisible: state => state.isSideMenuVisible,
    isSettingsVisible: state => state.isSettingsMenuVisible,
    getNotification: state => state.notification,
    allImageSettings: state => state.imageSettings,
    getJpegSettings: state => state.imageSettings.find(n => n.name === 'JPEG'),
  },
});
