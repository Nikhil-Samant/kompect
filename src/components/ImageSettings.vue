<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default>
          <v-row no-gutters>
            <v-col cols="12"> {{ setting.name }} </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-subheader class="pl-2"> Image Quality </v-subheader>
        <v-slider
          v-model="setting.quality"
          class="align-center"
          :max="setting.maxQuality"
          :min="setting.minQuality"
          hide-details
        >
          <template v-slot:append>
            <v-text-field
              v-model="setting.quality"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 40px"
            ></v-text-field>
          </template>
        </v-slider>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'ImageSettings',
  props: {
    setting: {
      type: Object,
      default: null,
    },
  },
  methods: {
    ...mapActions(['updateNewImageSetting']),
  },
  watch: {
    setting: {
      handler(newValue) {
        this.updateNewImageSetting(newValue);
      },
      deep: true,
    },
  },
});
</script>
