import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

export const env = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/roadguard',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecret_roadguard_key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  FRONTEND_URL: process.env.FRONTEND_URL || '*',
  AI_SERVICE_URL: process.env.AI_SERVICE_URL || 'http://localhost:5000',
  IS_DEMO_MODE: process.env.VITE_DEMO_MODE === 'true' || process.env.NODE_ENV === 'development',
};
