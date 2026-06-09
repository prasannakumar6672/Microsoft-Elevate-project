import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    complaint_number: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    priority: {
        type: String,
        default: 'Medium'
    },
    region: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    damage_type: {
        type: String,
        trim: true
    },
    severity_level: {
        type: String,
        trim: true
    },
    severity_score: {
        type: String,
        trim: true
    },
    confidence: {
        type: String,
        trim: true
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    citizen_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assigned_officer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    annotated_image_url: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

complaintSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        // Return citizen_id and assigned_officer_id as string representations
        if (ret.citizen_id) {
            if (typeof ret.citizen_id === 'object' && ret.citizen_id._id) {
                ret.citizen_name = ret.citizen_id.name;
                ret.citizen_id = ret.citizen_id._id.toString();
            } else {
                ret.citizen_id = ret.citizen_id.toString();
            }
        }
        if (ret.assigned_officer_id) {
            if (typeof ret.assigned_officer_id === 'object' && ret.assigned_officer_id._id) {
                ret.officer_name = ret.assigned_officer_id.name;
                ret.assigned_officer_id = ret.assigned_officer_id._id.toString();
            } else {
                ret.assigned_officer_id = ret.assigned_officer_id.toString();
            }
        }
        ret.created_at = ret.createdAt;
        ret.updated_at = ret.updatedAt;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    }
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
