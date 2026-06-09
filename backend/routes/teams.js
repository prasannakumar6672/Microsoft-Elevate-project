import express from 'express';
import Team from '../models/Team.js';
import WorkOrder from '../models/WorkOrder.js';
import Complaint from '../models/Complaint.js';
import { authMiddleware } from '../middleware/auth.js';
import { isMock, loadMockDB, saveMockDB } from '../config/mockDbHelper.js';

const router = express.Router();

// Apply auth middleware globally on dispatch routes
router.use(authMiddleware);

// GET / - List municipal repair teams
router.get('/', async (req, res) => {
    try {
        if (isMock()) {
            const db = loadMockDB();
            let teamsList = [...db.teams];
            if (req.user.role === 'official' && req.user.region) {
                teamsList = teamsList.filter(t => t.region === req.user.region);
            }
            return res.json(teamsList);
        }

        let query = {};
        if (req.user.role === 'official' && req.user.region) {
            query.region = req.user.region;
        }

        const teams = await Team.find(query);
        return res.json(teams);
    } catch (error) {
        console.error('Fetch teams error:', error);
        return res.status(500).json({ message: 'Failed to retrieve field teams.' });
    }
});

// POST /work-orders - Issue a new repair work order
router.post('/work-orders', async (req, res) => {
    try {
        const { complaint_id, team_id, instructions, priority } = req.body;

        if (!complaint_id || !team_id || !priority) {
            return res.status(400).json({ message: 'Complaint ID, Team ID, and Priority are required.' });
        }

        // ── FALLBACK MOCK MODE ──
        if (isMock()) {
            const db = loadMockDB();
            const complaint = db.complaints.find(c => c.id === complaint_id);
            if (!complaint) {
                return res.status(404).json({ message: 'Complaint not found.' });
            }

            const team = db.teams.find(t => t.id === team_id);
            if (!team) {
                return res.status(404).json({ message: 'Field team not found.' });
            }

            // Create work order
            const newWorkOrder = {
                id: 'wo-' + Date.now(),
                complaint_id,
                team_id,
                instructions,
                priority,
                status: 'Assigned',
                issued_by: req.user.id,
                team_name: team.name,
                complaint_number: complaint.complaint_number,
                created_at: new Date().toISOString()
            };

            db.workOrders.push(newWorkOrder);

            // Increment team workload count
            const currentCount = parseInt(team.tasks_count || '0', 10);
            team.tasks_count = String(currentCount + 1);

            // Update complaint status
            complaint.status = 'In Progress';
            complaint.assigned_officer_id = req.user.id;
            complaint.officer_name = req.user.name;
            complaint.updated_at = new Date().toISOString();

            saveMockDB(db);
            return res.status(201).json(newWorkOrder);
        }

        // ── PERSISTENT MONGO MODE ──
        const complaint = await Complaint.findById(complaint_id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }

        const team = await Team.findById(team_id);
        if (!team) {
            return res.status(404).json({ message: 'Field team not found.' });
        }

        const newWorkOrder = new WorkOrder({
            complaint_id,
            team_id,
            instructions,
            priority,
            status: 'Assigned',
            issued_by: req.user.id
        });

        await newWorkOrder.save();

        const currentCount = parseInt(team.tasks_count || '0', 10);
        team.tasks_count = String(currentCount + 1);
        await team.save();

        complaint.status = 'In Progress';
        complaint.assigned_officer_id = req.user.id;
        await complaint.save();

        const populatedWorkOrder = await WorkOrder.findById(newWorkOrder._id)
            .populate({
                path: 'complaint_id',
                select: 'complaint_number title'
            })
            .populate({
                path: 'team_id',
                select: 'name lead_name'
            });

        const json = populatedWorkOrder.toJSON();
        json.team_name = team.name;
        json.complaint_number = complaint.complaint_number;

        return res.status(201).json(json);
    } catch (error) {
        console.error('Issue work order error:', error);
        return res.status(500).json({ message: 'Failed to issue work order.' });
    }
});

// GET /work-orders - Retrieve all work orders
router.get('/work-orders', async (req, res) => {
    try {
        if (isMock()) {
            const db = loadMockDB();
            // Return chronological lists
            const sorted = [...db.workOrders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            return res.json(sorted);
        }

        const workOrders = await WorkOrder.find({})
            .populate({
                path: 'complaint_id',
                select: 'complaint_number title region'
            })
            .populate({
                path: 'team_id',
                select: 'name lead_name'
            })
            .sort({ createdAt: -1 });

        const formatted = workOrders.map(wo => {
            const json = wo.toJSON();
            if (wo.team_id) {
                json.team_name = wo.team_id.name;
            }
            if (wo.complaint_id) {
                json.complaint_number = wo.complaint_id.complaint_number;
            }
            return json;
        });

        return res.json(formatted);
    } catch (error) {
        console.error('Fetch work orders error:', error);
        return res.status(500).json({ message: 'Failed to retrieve work orders.' });
    }
});

export default router;
