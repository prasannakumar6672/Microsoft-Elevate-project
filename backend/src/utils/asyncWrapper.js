/**
 * Wraps an async Express controller method to automatically catch
 * rejected promises and pass errors to Express next() error handler.
 * Eliminates repetitive try-catch blocks in controller handlers.
 */
export const asyncWrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
