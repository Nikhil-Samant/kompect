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
            <v-icon>mdi-navigation</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="text-h5">Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list dense>
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
import { mapState, mapActions } from 'vuex';
import { Menus } from '@/electron/model/Menu';

export default Vue.extend({
  name: 'Sidebar',
  data: () => ({
    menus: Menus,
  }),
  computed: {
    ...mapState(['isSideMenuVisible']),
  },
  methods: {
    ...mapActions(['toggleSidebar']),
    onClickOutside() {
      this.toggleSidebar({ value: false });
    },
    include() {
      return [document.querySelector('.included')];
    },
  },
});
</script>
