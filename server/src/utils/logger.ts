import fs from 'fs';
import path from 'path';
import { LoggerFunction, LogType } from '../types/loggingTypes';

const logger: LoggerFunction = (
  type: LogType = 'INFO',
  message: string,
  logToConsole: boolean = false
): void => {
  // Get the current date for the log file name
  const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // Ensure the logs directory exists in the root directory
  const logsDir = path.join(__dirname, '../logs');

  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  // Define the path to the log file (../logs/YYYY-MM-DD.log)
  const logFileName = `${currentDate}.log`;
  const logFilePath = path.join(logsDir, logFileName);

  // Construct the log entry
  const timestamp = new Date().toISOString();
  const entry = `${timestamp} [${type}] ${message}`;

  // Write to the log file
  fs.appendFile(logFilePath, entry + '\n', (error) => {
    if (error) {
      console.error(`Something went wrong while logging to file: ${error}`);
    }
  });

  // Write entry to console conditionally
  if (logToConsole) {
    console.log(entry);
  }
};

export default logger;
