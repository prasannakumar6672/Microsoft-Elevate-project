import express from 'express';
import * as complaintController from '../controllers/complaint.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  validateCreateComplaint,
  validateUpdateStatus,
  validateOfficialResponse,
} from '../validators/complaint.validator.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', validate(validateCreateComplaint), asyncWrapper(complaintController.createComplaint));
router.get('/mine', asyncWrapper(complaintController.getMyComplaints));
router.get('/', asyncWrapper(complaintController.getAllComplaints));
router.get('/:id', asyncWrapper(complaintController.getComplaintById));
router.patch('/:id/status', validate(validateUpdateStatus), asyncWrapper(complaintController.updateComplaintStatus));
router.post('/:id/respond', validate(validateOfficialResponse), asyncWrapper(complaintController.respondToComplaint));
router.get('/:id/responses', asyncWrapper(complaintController.getResponses));

export default router;
