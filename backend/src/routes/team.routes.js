import express from 'express';
import * as teamController from '../controllers/team.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/rbac.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { validateIssueWorkOrder } from '../validators/team.validator.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', asyncWrapper(teamController.listTeams));
router.post('/work-orders', requireRole('official'), validate(validateIssueWorkOrder), asyncWrapper(teamController.issueWorkOrder));
router.get('/work-orders', asyncWrapper(teamController.listWorkOrders));

export default router;
