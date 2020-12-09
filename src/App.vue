<template>
  <v-app>
    <Appbar />
    <Sidebar />
    <Settings />
    <v-main>
      <v-container class="full-height" fluid>
        <router-view></router-view>
        <v-spacer />
      </v-container>
    </v-main>
    <Notifications />
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import Appbar from '@/components/Appbar.vue';
import Settings from '@/components/Settings.vue';
import Footer from '@/components/Footer.vue';
import Notifications from '@/components/Notifications.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Sidebar,
    Appbar,
    Settings,
    Notifications,
    Footer,
  },
});
</script>

<style lang="scss" scoped>
.full-height {
  height: 100%;
}
</style>
