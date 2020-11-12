<template>
  <v-app>
    <Appbar />
    <Sidebar />
    <Settings />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Sidebar from './components/Sidebar.vue';
import Appbar from './components/Appbar.vue';
import Settings from './components/Settings.vue';
import Footer from './components/Footer.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Sidebar,
    Appbar,
    Settings,
    Footer,
  },

});
</script>
