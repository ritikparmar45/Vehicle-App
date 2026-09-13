/**
 * Senior Developer Production Logger
 * Provides structured JSON/Formatted logging with timestamp and log levels.
 */
class Logger {
  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }

  info(message, meta) {
    console.log(this.formatMessage('info', message, meta));
  }

  warn(message, meta) {
    console.warn(this.formatMessage('warn', message, meta));
  }

  error(message, meta) {
    console.error(this.formatMessage('error', message, meta));
  }

  debug(message, meta) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(this.formatMessage('debug', message, meta));
    }
  }
}

export const logger = new Logger();
