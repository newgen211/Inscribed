export type LogType = 'INFO' | 'DEBUG' | 'ERROR';

export type LoggerFunction = {
  (type: LogType, message: string, logToConsole: boolean): void;
};
