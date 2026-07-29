import { ForbiddenError } from '../errors/ForbiddenError.js';

export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError(`Forbidden. Requires one of roles: [${allowedRoles.join(', ')}]`));
    }
    next();
  };
};
