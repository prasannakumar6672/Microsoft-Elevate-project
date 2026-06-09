import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['citizen', 'official'],
        default: 'citizen'
    },
    region: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Transform the returned JSON (remove password, convert _id to id)
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', userSchema);
export default User;
