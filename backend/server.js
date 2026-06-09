import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { connectDB } from './config/db.js';

// Load routers
import authRouter from './routes/auth.js';
import complaintsRouter from './routes/complaints.js';
import dashboardRouter from './routes/dashboard.js';
import teamsRouter from './routes/teams.js';
import detectRouter from './routes/detect.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DB Connection
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS
app.use(cors({
    origin: '*', // Allow all origins for dev environment
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure upload directories exist
const uploadDir = path.join(__dirname, 'uploads');
fs.mkdirSync(path.join(uploadDir, 'raw'), { recursive: true });
fs.mkdirSync(path.join(uploadDir, 'annotated'), { recursive: true });

// Static assets hosting for uploaded raw and annotated files
app.use('/uploads', express.static(uploadDir));

// Route bindings
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/complaints', complaintsRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/teams', teamsRouter);
app.use('/api/v1/detect', detectRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', time: new Date() });
});

// Root path redirect/fallback
app.get('/', (req, res) => {
    res.send('RoadGuard AI Civic Complaint API Server is running.');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error occurred.'
    });
});

app.listen(PORT, () => {
    console.log(`\n=================================================`);
    console.log(`RoadGuard AI Backend Server running on port ${PORT}`);
    console.log(`Local Access: http://localhost:${PORT}`);
    console.log(`=================================================\n`);
});
