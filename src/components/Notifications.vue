<template>
  <v-snackbar
    :value="getNotification.isNotificationVisible"
    :timeout="getNotification.timeout"
  >
    {{ getNotification.text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="blue" text v-bind="attrs" @click="closeNotification">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapGetters(['getNotification']),
  },
  methods: {
    ...mapActions(['toggleNotifications']),
    closeNotification() {
      this.toggleNotifications({ value: false, message: '' });
    },
  },
});
</script>
