<template>
  <v-sheet class="home">
    <v-row>
      <v-col>
        <v-card flat max-height="200" max-width="200">
          <v-img
            src="@/assets/AppLogo_200x200.png"
            max-height="150"
            position="left"
          />
        </v-card>
        <v-subheader>The Image Compression Tool</v-subheader>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="pl-4 text-body-2">
          Imagemin library is used under the hood for compresessing the Image
          files
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="pl-0">
          <v-btn color="primary" text @click="routeToMinifyPage">
            Click Here to Minify your files.
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  methods: {
    routeToMinifyPage() {
      this.$router.push({ name: 'ImageMinify' });
    },
  },
});
</script>
