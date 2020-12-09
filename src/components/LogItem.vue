<template>
  <v-list-item>
    <v-list-item-icon :set="(l = logType(log))">
      <v-chip x-small class="ma-2" :color="l.bgColor" :text-color="l.textColor">
        {{ l.text }}
      </v-chip>
    </v-list-item-icon>
    <v-list-item-content>
      {{ log.message }}
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { LogModel } from '@/electron/model/LogModel';
import { LogType } from '@/electron/shared/Constants';
import Vue from 'vue';

export default Vue.extend({
  name: 'LogItem',
  props: {
    log: {
      type: Object,
      default: null,
    },
  },
  methods: {
    logType(item: LogModel) {
      switch (item.logType as LogType) {
        case LogType.info:
          return {
            text: 'info',
            textColor: 'black',
            bgColor: 'info',
          };
        case LogType.error:
          return {
            text: 'error',
            textColor: 'white',
            bgColor: 'red',
          };
        default:
          return {
            typeText: '',
            textColor: '',
            bgColor: '',
          };
      }
    },
  },
});
</script>
