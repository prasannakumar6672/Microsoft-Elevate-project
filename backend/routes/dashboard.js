import express from 'express';
import Complaint from '../models/Complaint.js';
import { authMiddleware } from '../middleware/auth.js';
import { isMock, loadMockDB } from '../config/mockDbHelper.js';

const router = express.Router();

// Apply auth middleware globally on dashboard analytics routes
router.use(authMiddleware);

// GET /stats - General dashboard summary
router.get('/stats', async (req, res) => {
    try {
        let query = {};
        
        // ── FALLBACK MOCK MODE ──
        if (isMock()) {
            const db = loadMockDB();
            let complaints = [...db.complaints];

            if (req.user.role === 'official' && req.user.region) {
                complaints = complaints.filter(c => c.region === req.user.region);
            }

            const total = complaints.length;
            const pending = complaints.filter(c => c.status === 'Pending').length;
            const in_progress = complaints.filter(c => c.status === 'In Progress').length;
            const resolved = complaints.filter(c => c.status === 'Resolved').length;

            return res.json({
                total,
                pending,
                in_progress,
                resolved
            });
        }

        // ── PERSISTENT MONGO MODE ──
        if (req.user.role === 'official' && req.user.region) {
            query.region = req.user.region;
        }

        const total = await Complaint.countDocuments(query);
        const pending = await Complaint.countDocuments({ ...query, status: 'Pending' });
        const in_progress = await Complaint.countDocuments({ ...query, status: 'In Progress' });
        const resolved = await Complaint.countDocuments({ ...query, status: 'Resolved' });

        return res.json({
            total,
            pending,
            in_progress,
            resolved
        });
    } catch (error) {
        console.error('Fetch dashboard stats error:', error);
        return res.status(500).json({ message: 'Failed to aggregate dashboard statistics.' });
    }
});

// GET /heatmap - Map hotspot coordinate points
router.get('/heatmap', async (req, res) => {
    try {
        const REGION_CENTROIDS = {
            'Kukatpally': { lat: 17.4849, lng: 78.3889 },
            'Mehdipatnam': { lat: 17.3916, lng: 78.4385 },
            'Gachibowli': { lat: 17.4401, lng: 78.3489 },
            'Hitech City': { lat: 17.4435, lng: 78.3772 },
            'Secunderabad': { lat: 17.4399, lng: 78.4983 },
            'Begumpet': { lat: 17.4447, lng: 78.4664 }
        };

        let complaints = [];

        if (isMock()) {
            const db = loadMockDB();
            complaints = [...db.complaints];
            if (req.user.role === 'official' && req.user.region) {
                complaints = complaints.filter(c => c.region === req.user.region);
            }
        } else {
            let query = {};
            if (req.user.role === 'official' && req.user.region) {
                query.region = req.user.region;
            }
            complaints = await Complaint.find(query);
        }

        const heatmapGroups = {};

        for (const comp of complaints) {
            const areaName = comp.region || 'Kukatpally';
            const lat = comp.latitude || (REGION_CENTROIDS[areaName]?.lat || 17.4849) + (Math.random() - 0.5) * 0.01;
            const lng = comp.longitude || (REGION_CENTROIDS[areaName]?.lng || 78.3889) + (Math.random() - 0.5) * 0.01;

            if (!heatmapGroups[areaName]) {
                heatmapGroups[areaName] = {
                    area: `${areaName} Sector`,
                    complaint_count: 0,
                    severity: 'LOW',
                    latitude: lat,
                    longitude: lng,
                    highCount: 0
                };
            }

            heatmapGroups[areaName].complaint_count += 1;
            if (comp.severity_level === 'HIGH') {
                heatmapGroups[areaName].highCount += 1;
            }
        }

        const heatmapData = Object.values(heatmapGroups).map(group => {
            const ratio = group.highCount / group.complaint_count;
            group.severity = ratio > 0.4 ? 'HIGH' : (ratio > 0.1 ? 'MEDIUM' : 'LOW');
            delete group.highCount;
            return group;
        });

        if (heatmapData.length === 0) {
            const defaultRegion = req.user.region || 'Kukatpally';
            const defaultCentroid = REGION_CENTROIDS[defaultRegion] || REGION_CENTROIDS['Kukatpally'];
            heatmapData.push({
                area: `${defaultRegion} Sector A`,
                complaint_count: 0,
                severity: 'LOW',
                latitude: defaultCentroid.lat,
                longitude: defaultCentroid.lng
            });
        }

        return res.json(heatmapData);
    } catch (error) {
        console.error('Fetch heatmap points error:', error);
        return res.status(500).json({ message: 'Failed to aggregate map hotspots.' });
    }
});

// GET /trends - Weekly trend stats
router.get('/trends', async (req, res) => {
    try {
        let complaints = [];

        if (isMock()) {
            const db = loadMockDB();
            complaints = [...db.complaints];
            if (req.user.role === 'official' && req.user.region) {
                complaints = complaints.filter(c => c.region === req.user.region);
            }
        } else {
            let query = {};
            if (req.user.role === 'official' && req.user.region) {
                query.region = req.user.region;
            }
            complaints = await Complaint.find(query);
        }

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const trendMap = {};

        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dayName = daysOfWeek[d.getDay()];
            last7Days.push(dayName);
            trendMap[dayName] = 0;
        }

        for (const comp of complaints) {
            const dateVal = comp.created_at || comp.createdAt;
            if (dateVal) {
                const dayName = daysOfWeek[new Date(dateVal).getDay()];
                if (dayName in trendMap) {
                    trendMap[dayName] += 1;
                }
            }
        }

        const trendData = last7Days.map(day => ({
            day,
            count: trendMap[day] || 0
        }));

        return res.json(trendData);
    } catch (error) {
        console.error('Fetch trends error:', error);
        return res.status(500).json({ message: 'Failed to aggregate trends.' });
    }
});

export default router;
