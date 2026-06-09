import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/roadguard';

export const connectDB = async () => {
    try {
        console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connection established successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:');
        console.error(error.message);
        console.log('\n--- IMPORTANT ---');
        console.log('To run the backend with persistent storage, please ensure MongoDB is running locally,');
        console.log('or configure a valid MONGODB_URI connection string in backend/.env.');
        console.log('-----------------\n');
    }
};
