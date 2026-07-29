import { Detection } from '../../models/Detection.model.js';

export class DetectionRepository {
  async create(data) {
    const detection = new Detection(data);
    await detection.save();
    return detection;
  }

  async findById(id) {
    return await Detection.findById(id);
  }
}
