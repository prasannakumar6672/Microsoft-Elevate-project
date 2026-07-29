import { verifyToken } from '../utils/jwt.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { getUserRepository } from '../repositories/index.js';
import { env } from '../config/env.config.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authorization Bearer token required.');
    }

    const token = authHeader.split(' ')[1];

    // Support demo-token bypass in dev mode
    if (token === 'demo-token' && env.IS_DEMO_MODE) {
      const userRepo = getUserRepository();
      let demoUser = await userRepo.findByEmail('prasanna@test.com');
      if (!demoUser) {
        demoUser = { id: 'demo-user-1', name: 'Demo User', email: 'demo@test.com', role: 'citizen' };
      }

      req.user = {
        id: demoUser.id || demoUser._id?.toString(),
        email: demoUser.email,
        role: demoUser.role,
        name: demoUser.name,
        region: demoUser.region,
      };
      return next();
    }

    const decoded = verifyToken(token);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
      region: decoded.region,
    };

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) return next(error);
    return next(new UnauthorizedError('Invalid or expired authentication token.'));
  }
};
