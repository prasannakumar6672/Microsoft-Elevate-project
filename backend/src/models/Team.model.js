import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    lead_name: { type: String, required: true, trim: true },
    region: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Active', 'On Break'], default: 'Active' },
    current_location: { type: String, trim: true },
    tasks_count: { type: String, default: '0' },
  },
  { timestamps: true }
);

teamSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

export const Team = mongoose.model('Team', teamSchema);
