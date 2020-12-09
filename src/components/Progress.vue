<template>
  <v-dialog :value="isloading" persistent width="350">
    <v-card color="light-blue lighten-2">
      <v-card-title class="pt-1"
        >{{ fileMinified }} minified out of {{ totalFiles }}</v-card-title
      >
      <v-card-subtitle class="pt-2"
        >Please wait while we minify your images</v-card-subtitle
      >
      <v-card-text>
        <v-progress-linear
          :value="currentProgress"
          :indeterminate="showProgress"
          color="white"
          class="mb-0"
          :query="true"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Progress',
  props: {
    isloading: {
      type: Boolean,
      default: false,
    },
    fileMinified: {
      type: Number,
      default: 0,
    },
    totalFiles: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    showProgress() {
      if (this.fileMinified > 0) {
        return false;
      }
      return true;
    },
    currentProgress() {
      if (this.fileMinified === 0) return 0;
      const interval = 100 / this.totalFiles;
      return (this.fileMinified as number) * interval;
    },
  },
});
</script>
