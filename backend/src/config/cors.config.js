import { env } from './env.config.js';

export const corsOptions = {
  origin: env.FRONTEND_URL === '*' ? '*' : [env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
