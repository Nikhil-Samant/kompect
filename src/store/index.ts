import { LogModel } from '@/electron/model/LogModel';
import Vue from 'vue';
import Vuex from 'vuex';
import {
  defaultJpegSettings,
  defaultPngSettings,
} from '../electron/model/ImageSettings';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* Navigation Drawers */
    isSideMenuVisible: false,
    isSettingsMenuVisible: false,
    notification: {
      isNotificationVisible: false,
      text: '',
      timeout: 3000,
    },
    imageSettings: [defaultJpegSettings, defaultPngSettings],
    isLosslessCompressionReq: false,
    logs: [] as LogModel[],
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

    updateLogs(state, log: LogModel) {
      state.logs.push(log);
    },

    toggleLosslessComp(state, value) {
      state.isLosslessCompressionReq = value;
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
    async updatelogger({ commit }, log) {
      commit('updateLogs', log);
    },
    async toggleLosslessComp({ commit }, value) {
      commit('toggleLosslessComp', value);
    },
  },
  modules: {},
  getters: {
    isSidebarVisible: state => state.isSideMenuVisible,
    isSettingsVisible: state => state.isSettingsMenuVisible,
    getNotification: state => state.notification,
    allImageSettings: state => state.imageSettings,
    getJpegSettings: state => state.imageSettings.find(n => n.name === 'JPEG'),
    getPngSettings: state => state.imageSettings.find(n => n.name === 'PNG'),
    getLogs: state => state.logs,
    isLosslessCompressionReq: state => state.isLosslessCompressionReq,
  },
});
