import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { validateRegister, validateLogin } from '../validators/auth.validator.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

const router = express.Router();

router.post('/register', validate(validateRegister), asyncWrapper(authController.register));
router.post('/login', validate(validateLogin), asyncWrapper(authController.login));

export default router;
