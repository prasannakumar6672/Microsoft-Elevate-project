import express from 'express';
import * as dashboardController from '../controllers/dashboard.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/stats', asyncWrapper(dashboardController.getStats));
router.get('/heatmap', asyncWrapper(dashboardController.getHeatmap));
router.get('/trends', asyncWrapper(dashboardController.getTrends));

export default router;
