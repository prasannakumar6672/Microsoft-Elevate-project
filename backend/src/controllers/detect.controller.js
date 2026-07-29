import { detectionService } from '../services/detection.service.js';
import { BadRequestError } from '../errors/BadRequestError.js';

export const predict = async (req, res) => {
  if (!req.file) {
    throw new BadRequestError('No image file uploaded.');
  }

  const reqHostProtocol = `${req.protocol}://${req.get('host')}`;
  const result = await detectionService.processDetection(req.file, reqHostProtocol);
  return res.status(201).json(result);
};

export const getDetectionById = async (req, res) => {
  const result = await detectionService.getDetectionById(req.params.id);
  return res.json(result);
};
