import mongoose from 'mongoose';

const detectionSchema = new mongoose.Schema(
  {
    damage_type: { type: String, enum: ['Pothole', 'Crack', 'No Damage'], default: 'No Damage' },
    confidence: { type: Number, default: 0 },
    severity_level: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'LOW' },
    severity_score: { type: Number, default: 0 },
    damage_count: { type: Number, default: 0 },
    annotated_image_url: { type: String, trim: true },
    latitude: { type: Number },
    longitude: { type: Number },
    address: { type: String, trim: true },
  },
  { timestamps: true }
);

detectionSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.detection_id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

export const Detection = mongoose.model('Detection', detectionSchema);
