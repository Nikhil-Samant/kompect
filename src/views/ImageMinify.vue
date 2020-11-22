<template>
  <v-sheet color="white" elevation="1">
    <v-form v-model="valid" ref="form" lazy-validation>
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
              v-model="imageFiles"
              required
              :rules="[v => v.length > 0 || 'Please select atleast 1 file']"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="destination"
              label="Output Directory"
              @click="openDir"
              :rules="[v => !!v || 'Please select the output directory']"
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
    <Progress
      :isloading="isloading"
      :file-minified="fileMinified"
      :total-files="totalFiles"
    />
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import { ipcRenderer } from 'electron';
import path from 'path';
import { mapActions, mapGetters } from 'vuex';
import Progress from '@/components/Progress.vue';
import { ImageRequest } from '../shared/model/ImageRequest';

export default Vue.extend({
  name: 'ImageMinify',
  components: {
    Progress,
  },
  data: () => ({
    imageFiles: [],
    destination: '',
    isloading: false,
    totalFiles: 0,
    fileMinified: 0,
    valid: true,
  }),
  computed: {
    ...mapGetters(['getNotification', 'getJpegSettings']),
  },
  mounted() {
    this.$nextTick(() => {
      // Register IPC Renderer event handles once for this control
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ipcRenderer.on('fileMinified', async (event, fileIndex) => {
        this.fileMinified += 1;
        if (this.fileMinified === this.totalFiles) {
          this.isloading = false;
          this.showNotification();
          this.reset();
        }
      });
      ipcRenderer.on('outputDir', async (event, directory: string) => {
        this.destination = directory;
      });
    });
  },
  methods: {
    ...mapActions(['toggleNotifications']),
    async openDir() {
      await ipcRenderer.invoke('openDirectory');
    },
    minify() {
      this.valid = (this.$refs.form as Vue & {
        validate: () => boolean;
      }).validate();
      console.log(this.valid);
      if (!this.valid) {
        return;
      }
      const request: ImageRequest[] = [];
      this.totalFiles = this.imageFiles.length;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filePaths = this.imageFiles.map((f: any) => path.resolve(f.path));
      this.isloading = true;
      filePaths.forEach(source =>
        request.push({
          source,
          destination: this.destination,
          imageSettings: {
            jpegSetting: this.getJpegSettings,
          },
        })
      );
      ipcRenderer.invoke('minifyImageRequest', request);
    },
    reset() {
      this.fileMinified = 0;
      this.totalFiles = 0;
      (this.$refs.form as Vue & {
        reset: () => boolean;
      }).reset();
    },
    async showNotification() {
      await this.toggleNotifications({
        value: true,
        message: `${this.totalFiles} image file(s) minified sucessfully.`,
      });
      setTimeout(async () => {
        await this.toggleNotifications({
          value: false,
          message: '',
        });
      }, this.getNotification.timeout);
    },
  },
});
</script>
