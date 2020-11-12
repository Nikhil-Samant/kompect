<template>
  <v-app-bar
      app
      color="info"
      dark
    >
    <v-app-bar-nav-icon @click="toggleSidebar()"></v-app-bar-nav-icon>

      <v-toolbar-title>Pichkoo</v-toolbar-title>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="toggleSettings">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Appbar',

  computed: {
    ...mapState(['isSideMenuVisible', 'isSettingsMenuVisible']),
  },

  data: () => ({
    settings: null,
  }),

  methods: {
    toggleSidebar() {
      this.$store.commit('toggleSidebar', { value: !this.isSideMenuVisible });
    },
    toggleSettings() {
      this.$store.commit('toggleSettings', { value: !this.isSettingsMenuVisible });
    },
  },
});
</script>
