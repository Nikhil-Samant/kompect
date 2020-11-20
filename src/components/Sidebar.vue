<template>
  <v-card>
    <v-navigation-drawer
      v-click-outside="{
        handler: onClickOutside,
        include: include,
      }"
      :value="isSideMenuVisible"
      app
      temporary
    >
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-avatar>
            <!-- Image -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Navigation</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list dense rounded>
        <div v-for="menu in menus" :key="menu.label">
          <v-list-item :to="menu.to">
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ menu.label }}</v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Sidebar',
  data: () => ({
    menus: [
      {
        label: 'Home',
        icon: 'mdi-home-city',
        to: '/',
      },
      {
        label: 'Minify Image',
        icon: 'mdi-folder-multiple-image',
        to: '/imageMinify',
      },
    ],
  }),
  computed: {
    ...mapState(['isSideMenuVisible']),
  },
  methods: {
    onClickOutside() {
      this.$store.commit('toggleSidebar', { value: false });
    },
    include() {
      return [document.querySelector('.included')];
    },
  },
});
</script>
