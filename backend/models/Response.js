import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
    complaint_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint',
        required: true
    },
    officer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status_changed_to: {
        type: String
    }
}, {
    timestamps: true
});

responseSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        ret.complaint_id = ret.complaint_id.toString();
        if (ret.officer_id) {
            if (typeof ret.officer_id === 'object' && ret.officer_id._id) {
                ret.officer_name = ret.officer_id.name;
                ret.officer_id = ret.officer_id._id.toString();
            } else {
                ret.officer_id = ret.officer_id.toString();
            }
        }
        ret.created_at = ret.createdAt;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});

const Response = mongoose.model('Response', responseSchema);
export default Response;
