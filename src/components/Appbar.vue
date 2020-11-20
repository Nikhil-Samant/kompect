<template>
  <v-app-bar
      app
      color="info"
      dark
      class="included"
    >
    <v-app-bar-nav-icon @click="toggleSidebar()"></v-app-bar-nav-icon>
      <v-toolbar-title>Pichkoo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="toggleSettings">
        <v-icon>mdi-cogs</v-icon>
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
      this.$store.commit('toggleSidebar', { value: true });
    },
    toggleSettings() {
      this.$store.commit('toggleSettings', { value: true });
    },
  },
  watch: {
    $route() {
      this.$store.commit('toggleSidebar', { value: false });
      this.$store.commit('toggleSettings', { value: false });
    },
  },
});
</script>
