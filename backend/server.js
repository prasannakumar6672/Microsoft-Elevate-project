import app from './src/app.js';
import { env } from './src/config/env.config.js';
import { connectDB } from './src/config/db.config.js';
import { logger } from './src/utils/logger.js';

const startServer = async () => {
  // Attempt DB connection
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`=================================================`);
    logger.info(`RoadGuard AI Backend Server running on port ${env.PORT}`);
    logger.info(`Local Access: http://localhost:${env.PORT}`);
    logger.info(`Mode: ${env.NODE_ENV}`);
    logger.info(`=================================================`);
  });
};

startServer();
