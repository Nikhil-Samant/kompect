<template>
  <v-sheet height="100%" elevation="3">
    <p class="text-h5 pl-3 pt-3">Logs</p>
    <v-virtual-scroll :items="getLogs" :item-height="50" height="100%">
      <template v-slot:default="{ item }">
        <log-item :log="item" />
      </template>
    </v-virtual-scroll>
  </v-sheet>
</template>

<script lang="ts">
import LogItem from '@/components/LogItem.vue';
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  components: { LogItem },
  name: 'Logs',
  computed: {
    ...mapGetters(['getLogs']),
  },
});
</script>
