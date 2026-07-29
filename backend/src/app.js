import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { corsOptions } from './config/cors.config.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { rateLimiter } from './middlewares/rateLimiter.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS
app.use(cors(corsOptions));

// Global Rate Limiter
app.use('/api/', rateLimiter({ windowMs: 15 * 60 * 1000, max: 200 }));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upload directory static hosting
const uploadDir = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(path.join(uploadDir, 'raw'), { recursive: true });
fs.mkdirSync(path.join(uploadDir, 'annotated'), { recursive: true });
app.use('/uploads', express.static(uploadDir));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', time: new Date().toISOString() });
});

// Root path fallback
app.get('/', (req, res) => {
  res.send('RoadGuard AI Civic Complaint API Server is running.');
});

// Master API Routes Namespace
app.use('/api/v1', apiRouter);

// Centralized Error Middleware (must be registered last)
app.use(errorHandler);

export default app;
