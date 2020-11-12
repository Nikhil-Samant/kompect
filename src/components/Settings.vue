<template>
  <v-navigation-drawer :value="isSettingsMenuVisible" app temporary right>
    <!--  -->
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Settings',
  computed: {
    ...mapState(['isSettingsMenuVisible']),
  },
});
</script>
