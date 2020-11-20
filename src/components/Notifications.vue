<template>
  <v-snackbar
      :value="isNotificationVisible"
      :timeout="timeout"
    >
      {{ notificationText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="closeNotification"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  data: () => ({
    timeout: 5000,
  }),
  computed: {
    ...mapState(['isNotificationVisible', 'notificationText']),
  },
  methods: {
    closeNotification() {
      this.$store.commit('toggleNotifications', { value: false, message: '' });
    },
  },
});
</script>
