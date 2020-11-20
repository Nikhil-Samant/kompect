<template>
  <v-sheet color="white" elevation="1">
    <v-form>
      <v-card class="mx-auto" outlined elevation="4">
        <v-card-title class="headline"> Minify Images </v-card-title>
        <v-row>
          <v-col cols="12" sm="6">
            <v-file-input
              label="Select Image File"
              show-size
              counter
              multiple
              prepend-inner-icon="mdi-image"
              v-model="sourceFile"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="destination"
              label="Output Directory"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions class="pt-0">
          <v-btn
            color="primary"
            :disabled="isloading"
            :isloading="isloading"
            @click="minify"
          >
            Minify
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <v-dialog v-model="isloading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please wait while we minify your images
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import { ipcRenderer } from 'electron';
import path from 'path';
import { ImageRequest } from '../shared/model/ImageRequest';

export default Vue.extend({
  name: 'ImageMinify',
  data: () => ({
    sourceFile: [],
    destination: '/Users/nikhil/Desktop/',
    quality: 75,
    result: undefined,
    isloading: false,
  }),
  mounted() {
    this.$nextTick(() => {
      // Register IPC Renderer event handles once for this control
      ipcRenderer.on('minifyImageResponse', (event, args) => {
        this.isloading = false;
        this.$store.commit('toggleNotifications', {
          value: true,
          message: args,
        });
      });
    });
  },
  methods: {
    minify() {
      this.isloading = true;
      const request: ImageRequest[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filePaths = this.sourceFile.map((f: any) => path.resolve(f.path));
      filePaths.forEach((source) => request.push({
        source,
        destination: this.destination,
        quality: this.quality,
      }));
      ipcRenderer.send('minifyImageRequest', request);
    },
  },
});
</script>
