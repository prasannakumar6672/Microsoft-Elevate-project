import mongoose from 'mongoose';
import { env } from './env.config.js';
import { logger } from '../utils/logger.js';

let isConnected = false;

export const connectDB = async () => {
  try {
    logger.info(`Connecting to MongoDB at: ${env.MONGODB_URI}`);
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 4000,
    });
    isConnected = true;
    logger.info('MongoDB connection established successfully.');
  } catch (error) {
    isConnected = false;
    logger.warn(`MongoDB offline (${error.message}). Switching to local memory repository fallback.`);
  }
};

export const isDbConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};
