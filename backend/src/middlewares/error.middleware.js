import { AppError } from '../errors/AppError.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    logger.warn(`Operational Error [${err.errorCode}]: ${err.message}`, { details: err.details });
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.errorCode,
        message: err.message,
        details: err.details,
      },
    });
  }

  logger.error('Unhandled Application Error:', { message: err.message, stack: err.stack });

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error occurred.',
    },
  });
};
