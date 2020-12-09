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
import { LogType } from '@/electron/shared/Constants';
import { mapActions, mapGetters } from 'vuex';
import Progress from '@/components/Progress.vue';
import Logger from '@/mixins/LoggerMixin';
import { ImageRequest } from '@/electron/model/ImageRequest';

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
    ...mapGetters([
      'getNotification',
      'getJpegSettings',
      'getPngSettings',
      'isLosslessCompressionReq',
    ]),
  },
  mounted() {
    this.$nextTick(() => {
      // Register IPC Renderer event handles once for this control
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ipcRenderer.on('fileMinified', async (event, file) => {
        this.fileMinified += 1;
        if (this.fileMinified === this.totalFiles) {
          this.isloading = false;
          Logger.log(LogType.info, `--- ${this.totalFiles} completed.`);
          this.showNotification(
            `${this.totalFiles} image file(s) minified sucessfully.`
          );
          this.reset();
        }
      });
      ipcRenderer.on('outputDir', async (event, directory: string) => {
        this.destination = directory;
      });
      ipcRenderer.on(
        'errorInCompressing',
        async (event, errorMessage: string) => {
          this.isloading = false;
          Logger.log(LogType.error, `--- ${errorMessage}`);
          this.showNotification('Failed to compress the Images');
        }
      );
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
      if (!this.valid) {
        return;
      }
      this.totalFiles = this.imageFiles.length;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filePaths = this.imageFiles.map((f: any) => path.resolve(f.path));
      this.isloading = true;
      const request: ImageRequest = {
        source: filePaths.map(source => source),
        destination: this.destination,
        isLosslessCompressionReq: this.isLosslessCompressionReq,
        imageSettings: {
          jpegSetting: this.getJpegSettings,
          pngSetting: this.getPngSettings,
        },
      };
      console.log(request);
      ipcRenderer.invoke('minifyImageRequest', request);
    },
    reset() {
      this.fileMinified = 0;
      this.totalFiles = 0;
      (this.$refs.form as Vue & {
        reset: () => boolean;
      }).reset();
    },
    async showNotification(message: string) {
      await this.toggleNotifications({
        value: true,
        message,
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
