import { format } from 'date-fns';
import store from '@/store/index';
import { DisplayTimeFormat, LogType } from '@/electron/shared/Constants';
import { LogModel } from '@/electron/model/LogModel';

const Logger = {
  log(type: LogType, message: string) {
    const log: LogModel = {
      logType: type,
      message: `Log ${format(Date.now(), DisplayTimeFormat)}: ${message}`,
    };
    store.dispatch('updatelogger', log);
  },
};

export default Logger;
