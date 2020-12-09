import { LogType } from '../shared/Constants';

export interface LogModel {
  logType: LogType;
  message: string;
}
