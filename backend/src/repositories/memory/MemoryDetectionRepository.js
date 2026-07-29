import { loadMockDB, saveMockDB } from '../../config/mockDbHelper.js';

export class MemoryDetectionRepository {
  async create(data) {
    const db = loadMockDB();
    const newDetection = {
      detection_id: 'detect-' + Date.now(),
      ...data,
    };
    db.detections.push(newDetection);
    saveMockDB(db);
    return newDetection;
  }

  async findById(id) {
    const db = loadMockDB();
    return db.detections.find(d => d.detection_id === id) || null;
  }
}
