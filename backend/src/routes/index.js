import express from 'express';
import authRoutes from './auth.routes.js';
import complaintRoutes from './complaint.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import teamRoutes from './team.routes.js';
import detectRoutes from './detect.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/complaints', complaintRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/teams', teamRoutes);
router.use('/detect', detectRoutes);

export default router;
