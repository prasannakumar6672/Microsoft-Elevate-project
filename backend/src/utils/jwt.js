import jwt from 'jsonwebtoken';
import { env } from '../config/env.config.js';

export const generateTokens = (user) => {
  const payload = {
    id: user.id || user._id?.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
    region: user.region,
  };

  const access_token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
  const refresh_token = jwt.sign({ id: payload.id }, env.JWT_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN });

  return { access_token, refresh_token };
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};
