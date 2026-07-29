import path from 'path';
import { getDetectionRepository } from '../repositories/index.js';
import { LocalStorageAdapter } from '../storage/LocalStorageAdapter.js';
import { AiClient } from '../integrations/aiClient.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export class DetectionService {
  constructor() {
    this.storage = new LocalStorageAdapter();
    this.aiClient = new AiClient();
  }

  async processDetection(file, reqHostProtocol) {
    const inputPath = file.path;
    const filename = file.filename;
    const outputFilename = 'annotated-' + filename.replace('raw-', '');
    const outputPath = this.storage.getAnnotatedPath(outputFilename);

    const aiResult = await this.aiClient.predictImage(inputPath, outputPath);

    const annotated_image_url = `${reqHostProtocol}/uploads/annotated/${outputFilename}`;

    const detectionRepo = getDetectionRepository();
    const newDetection = await detectionRepo.create({
      damage_type: aiResult.damage_type,
      confidence: aiResult.confidence,
      severity_level: aiResult.severity_level,
      severity_score: aiResult.severity_score,
      damage_count: aiResult.damage_count,
      annotated_image_url,
      latitude: aiResult.latitude,
      longitude: aiResult.longitude,
      address: aiResult.address,
    });

    return newDetection;
  }

  async getDetectionById(id) {
    const detectionRepo = getDetectionRepository();
    const detection = await detectionRepo.findById(id);
    if (!detection) {
      throw new NotFoundError('Detection record not found.');
    }
    return detection;
  }
}

export const detectionService = new DetectionService();
