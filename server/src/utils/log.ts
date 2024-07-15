import fs from 'fs';
import path from 'path';

export type LogType = 'INFO' | 'DEBUG' | 'ERROR';

// Get default logging settings
const LOG_DIR: string = 'logs';

// Ensure the logs directory exists
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

// Generate log file name based on today's date
const today: string         = new Date().toISOString().split('T')[0];
const LOG_FILE: string      = `${today}.log`;
const LOG_FILE_PATH: string = path.join(LOG_DIR, LOG_FILE);


// Logging function
const log = (type: LogType = 'INFO', message: string, consoleLog: boolean = true) => {

    // Create timestamp and message for the log
    const timestamp: string  = new Date().toISOString();
    const logMessage: string = `${timestamp}: [${type}] ${message}`;

    // Log message to file
    fs.appendFileSync(LOG_FILE_PATH, logMessage + '\n');

    // Log to console depending on settings
    if(consoleLog) {
        console.log(logMessage);
    }

};

export default log;