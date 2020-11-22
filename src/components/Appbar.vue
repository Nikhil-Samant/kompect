<template>
  <v-app-bar app color="info" dark class="included">
    <v-app-bar-nav-icon @click.stop="showHideSidebar"></v-app-bar-nav-icon>
    <v-toolbar-title>Pichkoo</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click.stop="showHideSetting">
      <v-icon>mdi-cogs</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'Appbar',

  methods: {
    ...mapActions(['toggleSidebar', 'toggleSettings']),
    showHideSidebar() {
      this.toggleSidebar({ value: true });
    },
    showHideSetting() {
      this.toggleSettings({ value: true });
    },
  },
  watch: {
    $route() {
      this.toggleSidebar({ value: false });
      this.toggleSettings({ value: false });
    },
  },
});
</script>
