<template>
  <v-card>
    <v-navigation-drawer
      v-click-outside="{
        handler: onClickOutside,
        include: include,
      }"
      :value="isSettingsVisible"
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
            <v-list-item-title class="text-h6"
              >Quick Settings</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-switch
        class="pl-3"
        v-model="$vuetify.theme.dark"
        inset
        label="Theme Dark"
      ></v-switch>
      <v-divider />
      <v-checkbox
        class="pl-3"
        :value="isLosslessCompressionReq"
        @click="toggleCompression"
      >
        <template v-slot:label>
          <div>
            Lossless Compression
          </div>
        </template>
      </v-checkbox>
      <v-divider />
      <image-settings
        :setting="setting"
        v-for="setting in allImageSettings"
        :key="setting.name"
      />
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import ImageSettings from './ImageSettings.vue';

export default Vue.extend({
  components: { ImageSettings },
  name: 'Settings',
  computed: {
    ...mapGetters([
      'isSettingsVisible',
      'allImageSettings',
      'isLosslessCompressionReq',
    ]),
  },
  methods: {
    ...mapActions([
      'toggleSettings',
      'updateNewJpegSettings',
      'toggleLosslessComp',
    ]),
    onClickOutside() {
      this.toggleSettings({ value: false });
    },
    include() {
      return [document.querySelector('.included')];
    },
    toggleCompression() {
      this.toggleLosslessComp(!this.isLosslessCompressionReq);
    },
  },
});
</script>
