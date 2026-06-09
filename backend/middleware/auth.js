import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_roadguard_key';

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token required.' });
        }

        const token = authHeader.split(' ')[1];

        // Graceful support for frontend demo login token if needed
        if (token === 'demo-token') {
            // Find first available user or fallback mock
            let demoUser = await User.findOne({});
            if (!demoUser) {
                return res.status(401).json({ message: 'Database is empty. Please run seeds first.' });
            }
            req.user = {
                id: demoUser._id.toString(),
                email: demoUser.email,
                role: demoUser.role,
                name: demoUser.name,
                region: demoUser.region
            };
            return next();
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name,
            region: decoded.region
        };

        next();
    } catch (error) {
        console.error('Authentication middleware error:', error.message);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
