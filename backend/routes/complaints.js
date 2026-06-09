import express from 'express';
import Complaint from '../models/Complaint.js';
import Detection from '../models/Detection.js';
import Response from '../models/Response.js';
import { authMiddleware } from '../middleware/auth.js';
import { isMock, loadMockDB, saveMockDB } from '../config/mockDbHelper.js';

const router = express.Router();

// Apply auth middleware globally on all complaint routes
router.use(authMiddleware);

// POST / - Create a complaint
router.post('/', async (req, res) => {
    try {
        const {
            detection_id,
            title,
            description,
            latitude,
            longitude,
            address,
            damage_type,
            severity_level,
            severity_score,
            confidence,
            region
        } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Complaint title is required.' });
        }

        const randNum = Math.floor(100000 + Math.random() * 900000);
        const complaint_number = `COMP-${randNum}`;

        // Initialize properties
        let aiFields = {
            damage_type,
            severity_level,
            severity_score,
            confidence,
            latitude: latitude ? parseFloat(latitude) : undefined,
            longitude: longitude ? parseFloat(longitude) : undefined,
            address,
            region
        };

        // ── FALLBACK MOCK MODE ──
        if (isMock()) {
            const db = loadMockDB();

            if (detection_id) {
                const detection = db.detections.find(d => d.detection_id === detection_id);
                if (detection) {
                    aiFields.damage_type = aiFields.damage_type || detection.damage_type;
                    aiFields.severity_level = aiFields.severity_level || detection.severity_level;
                    aiFields.severity_score = aiFields.severity_score || String(detection.severity_score);
                    aiFields.confidence = aiFields.confidence || String(detection.confidence);
                    aiFields.latitude = aiFields.latitude || detection.latitude;
                    aiFields.longitude = aiFields.longitude || detection.longitude;
                    aiFields.address = aiFields.address || detection.address;
                    aiFields.annotated_image_url = detection.annotated_image_url;
                }
            }

            const newComplaint = {
                id: 'comp-' + Date.now(),
                complaint_number,
                title,
                description,
                status: 'Pending',
                priority: aiFields.severity_level === 'HIGH' ? 'High' : (aiFields.severity_level === 'MEDIUM' ? 'Medium' : 'Low'),
                region: aiFields.region || req.user.region || 'Kukatpally',
                address: aiFields.address,
                damage_type: aiFields.damage_type,
                severity_level: aiFields.severity_level,
                severity_score: aiFields.severity_score,
                confidence: aiFields.confidence,
                latitude: aiFields.latitude,
                longitude: aiFields.longitude,
                citizen_id: req.user.id,
                citizen_name: req.user.name,
                annotated_image_url: aiFields.annotated_image_url,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            db.complaints.push(newComplaint);
            saveMockDB(db);

            return res.status(201).json(newComplaint);
        }

        // ── PERSISTENT MONGO MODE ──
        if (detection_id) {
            const detection = await Detection.findById(detection_id);
            if (detection) {
                aiFields.damage_type = aiFields.damage_type || detection.damage_type;
                aiFields.severity_level = aiFields.severity_level || detection.severity_level;
                aiFields.severity_score = aiFields.severity_score || String(detection.severity_score);
                aiFields.confidence = aiFields.confidence || String(detection.confidence);
                aiFields.latitude = aiFields.latitude || detection.latitude;
                aiFields.longitude = aiFields.longitude || detection.longitude;
                aiFields.address = aiFields.address || detection.address;
                aiFields.annotated_image_url = detection.annotated_image_url;
            }
        }

        const newComplaint = new Complaint({
            complaint_number,
            title,
            description,
            status: 'Pending',
            priority: aiFields.severity_level === 'HIGH' ? 'High' : (aiFields.severity_level === 'MEDIUM' ? 'Medium' : 'Low'),
            region: aiFields.region || req.user.region || 'Kukatpally',
            address: aiFields.address,
            damage_type: aiFields.damage_type,
            severity_level: aiFields.severity_level,
            severity_score: aiFields.severity_score,
            confidence: aiFields.confidence,
            latitude: aiFields.latitude,
            longitude: aiFields.longitude,
            citizen_id: req.user.id,
            annotated_image_url: aiFields.annotated_image_url
        });

        await newComplaint.save();

        const populated = await Complaint.findById(newComplaint._id)
            .populate('citizen_id', 'name email')
            .populate('assigned_officer_id', 'name email');

        return res.status(201).json(populated);
    } catch (error) {
        console.error('Create complaint error:', error);
        return res.status(500).json({ message: 'Failed to create complaint.' });
    }
});

// GET /mine - Get current user's complaints
router.get('/mine', async (req, res) => {
    try {
        if (isMock()) {
            const db = loadMockDB();
            const filtered = db.complaints.filter(c => c.citizen_id === req.user.id);
            return res.json(filtered);
        }

        const complaints = await Complaint.find({ citizen_id: req.user.id })
            .populate('citizen_id', 'name email')
            .populate('assigned_officer_id', 'name email')
            .sort({ createdAt: -1 });

        return res.json(complaints);
    } catch (error) {
        console.error('Fetch citizen complaints error:', error);
        return res.status(500).json({ message: 'Failed to fetch complaints.' });
    }
});

// GET / - Get all complaints with filters
router.get('/', async (req, res) => {
    try {
        const { status, severity, search } = req.query;

        if (isMock()) {
            const db = loadMockDB();
            let list = [...db.complaints];

            // Filter by official region
            if (req.user.role === 'official' && req.user.region) {
                list = list.filter(c => c.region === req.user.region);
            }

            if (status) {
                list = list.filter(c => c.status === status);
            }

            if (severity) {
                list = list.filter(c => c.severity_level === severity);
            }

            if (search) {
                const searchLower = String(search).toLowerCase();
                list = list.filter(c => 
                    (c.title && c.title.toLowerCase().includes(searchLower)) ||
                    (c.description && c.description.toLowerCase().includes(searchLower)) ||
                    (c.complaint_number && c.complaint_number.toLowerCase().includes(searchLower))
                );
            }

            // Sort newest first
            list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            return res.json(list);
        }

        let query = {};
        if (req.user.role === 'official' && req.user.region) {
            query.region = req.user.region;
        }

        if (status) {
            query.status = status;
        }

        if (severity) {
            query.severity_level = severity;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { complaint_number: { $regex: search, $options: 'i' } }
            ];
        }

        const complaints = await Complaint.find(query)
            .populate('citizen_id', 'name email')
            .populate('assigned_officer_id', 'name email')
            .sort({ createdAt: -1 });

        return res.json(complaints);
    } catch (error) {
        console.error('Fetch complaints error:', error);
        return res.status(500).json({ message: 'Failed to fetch complaints.' });
    }
});

// GET /:id - Get single complaint
router.get('/:id', async (req, res) => {
    try {
        if (isMock()) {
            const db = loadMockDB();
            const complaint = db.complaints.find(c => c.id === req.params.id);
            if (!complaint) {
                return res.status(404).json({ message: 'Complaint not found.' });
            }
            return res.json(complaint);
        }

        const complaint = await Complaint.findById(req.params.id)
            .populate('citizen_id', 'name email')
            .populate('assigned_officer_id', 'name email');

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }

        return res.json(complaint);
    } catch (error) {
        console.error('Fetch complaint details error:', error);
        return res.status(500).json({ message: 'Failed to fetch complaint details.' });
    }
});

// PATCH /:id/status - Update status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }

        if (isMock()) {
            const db = loadMockDB();
            const complaint = db.complaints.find(c => c.id === req.params.id);
            if (!complaint) {
                return res.status(404).json({ message: 'Complaint not found.' });
            }

            complaint.status = status;
            complaint.updated_at = new Date().toISOString();
            if (req.user.role === 'official') {
                complaint.assigned_officer_id = req.user.id;
                complaint.officer_name = req.user.name;
            }

            saveMockDB(db);
            return res.json(complaint);
        }

        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }

        complaint.status = status;
        if (req.user.role === 'official') {
            complaint.assigned_officer_id = req.user.id;
        }

        await complaint.save();

        const populated = await Complaint.findById(complaint._id)
            .populate('citizen_id', 'name email')
            .populate('assigned_officer_id', 'name email');

        return res.json(populated);
    } catch (error) {
        console.error('Update complaint status error:', error);
        return res.status(500).json({ message: 'Failed to update status.' });
    }
});

// POST /:id/respond - Create response
router.post('/:id/respond', async (req, res) => {
    try {
        const { message, status_changed_to } = req.body;
        if (!message) {
            return res.status(400).json({ message: 'Response message is required.' });
        }

        if (isMock()) {
            const db = loadMockDB();
            const complaint = db.complaints.find(c => c.id === req.params.id);
            if (!complaint) {
                return res.status(404).json({ message: 'Complaint not found.' });
            }

            const responseLog = {
                id: 'resp-' + Date.now(),
                complaint_id: complaint.id,
                officer_id: req.user.id,
                officer_name: req.user.name,
                message,
                status_changed_to,
                created_at: new Date().toISOString()
            };

            db.responses.push(responseLog);

            if (status_changed_to) {
                complaint.status = status_changed_to;
                complaint.assigned_officer_id = req.user.id;
                complaint.officer_name = req.user.name;
                complaint.updated_at = new Date().toISOString();
            }

            saveMockDB(db);
            return res.status(201).json(responseLog);
        }

        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }

        const responseLog = new Response({
            complaint_id: complaint._id,
            officer_id: req.user.id,
            message,
            status_changed_to
        });

        await responseLog.save();

        if (status_changed_to) {
            complaint.status = status_changed_to;
            complaint.assigned_officer_id = req.user.id;
            await complaint.save();
        }

        const populatedResponse = await Response.findById(responseLog._id)
            .populate('officer_id', 'name');

        return res.status(201).json(populatedResponse);
    } catch (error) {
        console.error('Create official response error:', error);
        return res.status(500).json({ message: 'Failed to create official response.' });
    }
});

// GET /:id/responses - Get responses list
router.get('/:id/responses', async (req, res) => {
    try {
        if (isMock()) {
            const db = loadMockDB();
            const responses = db.responses.filter(r => r.complaint_id === req.params.id);
            // Sort ascending by time
            responses.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            return res.json(responses);
        }

        const responses = await Response.find({ complaint_id: req.params.id })
            .populate('officer_id', 'name')
            .sort({ createdAt: 1 });

        return res.json(responses);
    } catch (error) {
        console.error('Fetch response logs error:', error);
        return res.status(500).json({ message: 'Failed to fetch response logs.' });
    }
});

export default router;
