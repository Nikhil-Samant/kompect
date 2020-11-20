<template>
  <v-card>
    <v-navigation-drawer
      v-click-outside="{
        handler: onClickOutside,
        include: include,
      }"
      :value="isSettingsMenuVisible"
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
      <v-expansion-panels>
        <v-expansion-panel v-for="setting in settings" :key="setting.label">
          <v-expansion-panel-header>
            <template v-slot:default>
              <v-row no-gutters>
                <v-col cols="12"> {{ setting.label }} </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <!-- <v-text-field
              v-model="trip.name"
              placeholder="Caribbean Cruise"
            ></v-text-field> -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Settings',
  data: () => ({
    settings: [
      {
        label: 'JPEG',
      },
      {
        label: 'PNG',
      },
    ],
  }),
  computed: {
    ...mapState(['isSettingsMenuVisible']),
  },
  methods: {
    onClickOutside() {
      this.$store.commit('toggleSettings', { value: false });
    },
    include() {
      return [document.querySelector('.included')];
    },
  },
});
</script>
