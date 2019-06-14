const winston = require('winston');
const fs = require('fs');

const myFormat = winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`);
const path = require('path');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const logDir = 'C:\\Users\\Public'; // directory path
if (!fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}
const logger = winston.createLogger({
  level: 'info',
  // format: winston.format.json(),
  format: winston.format.combine(
    winston.format.timestamp(),
    myFormat,
  ),
  transports: [
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    new winston.transports.File({
      filename: path.join('C:\\Users\\Public', 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join('C:\\Users\\Public', 'info.log'),
      level: 'warn',
      maxsize: 5242880, // 5MB
      maxFiles: 10,

    }),
  ],
});

logger.stream = {
  write(message) {
    // use message.trim() to remove empty line between logged lines
    // https://stackoverflow.com/a/28824464/3109731
    logger.info(message.trim());
  },
};


// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (env === 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      myFormat,
    ),
  }));
}

module.exports = logger;
