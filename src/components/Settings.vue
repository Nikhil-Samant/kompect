<template>
  <v-card>
    <v-navigation-drawer
      v-click-outside="{
        handler: onClickOutside,
        include: include,
      }"
      :value="isSettingsVisible"
      app
      right
      temporary
    >
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <settings-menu
        :setting="setting"
        v-for="setting in allImageSettings"
        :key="setting.name"
      />
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import SettingsMenu from './SettingsMenu.vue';

export default Vue.extend({
  components: { SettingsMenu },
  name: 'Settings',
  computed: {
    ...mapGetters(['isSettingsVisible', 'allImageSettings']),
  },
  methods: {
    ...mapActions(['toggleSettings', 'updateNewJpegSettings']),
    onClickOutside() {
      this.toggleSettings({ value: false });
    },
    include() {
      return [document.querySelector('.included')];
    },
  },
});
</script>
