import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as detectController from '../controllers/detect.controller.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const uploadRawDir = path.join(__dirname, '..', '..', 'uploads', 'raw');
fs.mkdirSync(uploadRawDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadRawDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'raw-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/predict', upload.single('file'), asyncWrapper(detectController.predict));
router.get('/:id', asyncWrapper(detectController.getDetectionById));

export default router;
