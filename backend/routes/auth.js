import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isMock, loadMockDB, saveMockDB } from '../config/mockDbHelper.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_roadguard_key';

// Generate token helper
const generateTokens = (user) => {
    const payload = {
        id: user.id || user._id?.toString(),
        email: user.email,
        role: user.role,
        name: user.name,
        region: user.region
    };
    const access_token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    const refresh_token = jwt.sign({ id: payload.id }, JWT_SECRET, { expiresIn: '7d' });
    return { access_token, refresh_token };
};

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, city } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        const emailLower = email.toLowerCase().trim();

        // ── FALLBACK MOCK MODE ──
        if (isMock()) {
            const db = loadMockDB();
            const existing = db.users.find(u => u.email.toLowerCase() === emailLower);
            if (existing) {
                return res.status(400).json({ message: 'User with this email already exists.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                id: 'user-new-' + Date.now(),
                name,
                email: emailLower,
                password: hashedPassword,
                role: 'citizen',
                city
            };

            db.users.push(newUser);
            saveMockDB(db);

            const { access_token, refresh_token } = generateTokens(newUser);

            return res.status(201).json({
                access_token,
                refresh_token,
                role: newUser.role,
                name: newUser.name,
                user_id: newUser.id
            });
        }

        // ── PERSISTENT MONGO MODE ──
        const existingUser = await User.findOne({ email: emailLower });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email: emailLower,
            password: hashedPassword,
            role: 'citizen',
            city
        });

        await newUser.save();
        const { access_token, refresh_token } = generateTokens(newUser);

        return res.status(201).json({
            access_token,
            refresh_token,
            role: newUser.role,
            name: newUser.name,
            user_id: newUser._id.toString()
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const emailLower = email.toLowerCase().trim();

        // ── FALLBACK MOCK MODE ──
        if (isMock()) {
            const db = loadMockDB();
            const user = db.users.find(u => u.email.toLowerCase() === emailLower);
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            // If seed password is plaintext, allow it, otherwise bcrypt compare
            let isMatch = false;
            if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
                isMatch = await bcrypt.compare(password, user.password);
            } else {
                isMatch = user.password === password;
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const { access_token, refresh_token } = generateTokens(user);

            return res.json({
                access_token,
                refresh_token,
                role: user.role,
                name: user.name,
                user_id: user.id,
                region: user.region
            });
        }

        // ── PERSISTENT MONGO MODE ──
        const user = await User.findOne({ email: emailLower });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const { access_token, refresh_token } = generateTokens(user);

        return res.json({
            access_token,
            refresh_token,
            role: user.role,
            name: user.name,
            user_id: user._id.toString(),
            region: user.region
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

export default router;
