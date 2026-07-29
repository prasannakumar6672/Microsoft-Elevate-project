import mongoose from 'mongoose';

const workOrderSchema = new mongoose.Schema(
  {
    complaint_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true },
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    instructions: { type: String, trim: true },
    priority: { type: String, required: true, default: 'Medium' },
    status: { type: String, required: true, default: 'Assigned' },
    issued_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

workOrderSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    ret.complaint_id = ret.complaint_id.toString();
    ret.team_id = ret.team_id.toString();
    ret.issued_by = ret.issued_by.toString();
    ret.created_at = ret.createdAt;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

export const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);
