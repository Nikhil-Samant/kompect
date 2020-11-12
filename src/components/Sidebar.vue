<template>
  <v-navigation-drawer
      :value="isSideMenuVisible"
      app
    >
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Navigation</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list dense rounded>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to='item.link'
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Sidebar',
  data: () => ({
    items: [
      { title: 'Compress Image', icon: 'mdi-home-city', link: '/' },
      { title: 'Compress Video', icon: 'mdi-account', link: '/about' },
    ],
  }),
  computed: {
    ...mapState(['isSideMenuVisible']),
  },
});
</script>
