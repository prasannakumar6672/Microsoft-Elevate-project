import { env } from '../config/env.config.js';

const levels = { error: 0, warn: 1, info: 2, debug: 3 };

function formatMessage(level, message, meta) {
  const timestamp = new Date().toISOString();
  const metaString = meta && Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}${metaString}`;
}

export const logger = {
  error: (message, meta) => console.error(formatMessage('error', message, meta)),
  warn: (message, meta) => console.warn(formatMessage('warn', message, meta)),
  info: (message, meta) => console.log(formatMessage('info', message, meta)),
  debug: (message, meta) => {
    if (env.NODE_ENV === 'development') {
      console.log(formatMessage('debug', message, meta));
    }
  },
};
