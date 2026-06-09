import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import Complaint from '../models/Complaint.js';
import Response from '../models/Response.js';
import Team from '../models/Team.js';
import WorkOrder from '../models/WorkOrder.js';
import Detection from '../models/Detection.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/roadguard';
const MOCK_DB_PATH = path.join(__dirname, '..', 'uploads', 'mock_db.json');

async function seed() {
    // Standard mock seeds definition
    const getPastDate = (daysAgo) => {
        const d = new Date();
        d.setDate(d.getDate() - daysAgo);
        return d.toISOString();
    };

    const mockData = {
        users: [
            {
                id: "user-citizen-1",
                name: "Prasanna Kumar",
                email: "prasanna@test.com",
                password: await bcrypt.hash('Test@123', 10),
                role: "citizen",
                city: "Hyderabad"
            },
            {
                id: "user-official-1",
                name: "Officer Ravi Kumar",
                email: "ravi@telangana.gov.in",
                password: await bcrypt.hash('Official@123', 10),
                role: "official",
                region: "Kukatpally",
                city: "Hyderabad"
            },
            {
                id: "user-official-2",
                name: "Officer Sunita Rao",
                email: "sunita@telangana.gov.in",
                password: await bcrypt.hash('Official@123', 10),
                role: "official",
                region: "Mehdipatnam",
                city: "Hyderabad"
            },
            {
                id: "user-official-3",
                name: "Officer Priya Sharma",
                email: "priya@telangana.gov.in",
                password: await bcrypt.hash('Official@123', 10),
                role: "official",
                region: "Gachibowli",
                city: "Hyderabad"
            }
        ],
        teams: [
            {
                id: "team-1",
                name: "Alpha Crew",
                lead_name: "Raju Singh",
                region: "Kukatpally",
                status: "Active",
                current_location: "Metro Pillar 12, Kukatpally",
                tasks_count: "2"
            },
            {
                id: "team-2",
                name: "Bravo Dispatch",
                lead_name: "Mohammad Ali",
                region: "Kukatpally",
                status: "Active",
                current_location: "JNTU Road, Kukatpally",
                tasks_count: "0"
            },
            {
                id: "team-3",
                name: "Charlie Squad",
                lead_name: "Vikram Rathore",
                region: "Mehdipatnam",
                status: "On Break",
                current_location: "Rethibowli Circle, Mehdipatnam",
                tasks_count: "1"
            },
            {
                id: "team-4",
                name: "Delta Repair",
                lead_name: "Satish Rao",
                region: "Gachibowli",
                status: "Active",
                current_location: "Wipro Junction, Gachibowli",
                tasks_count: "0"
            }
        ],
        complaints: [
            {
                id: "comp-1",
                complaint_number: "COMP-729402",
                title: "Major Pothole near JNTU Metro Pillar",
                description: "A very deep pothole causing vehicle damage and traffic jams.",
                status: "Pending",
                priority: "High",
                region: "Kukatpally",
                address: "Near JNTU Metro Station Pillar 10, Kukatpally, Hyderabad",
                damage_type: "Pothole",
                severity_level: "HIGH",
                severity_score: "4.2",
                confidence: "0.91",
                latitude: 17.4851,
                longitude: 78.3888,
                citizen_id: "user-citizen-1",
                citizen_name: "Prasanna Kumar",
                created_at: getPastDate(1)
            },
            {
                id: "comp-2",
                complaint_number: "COMP-110482",
                title: "Multiple Cracks on Flyover Ramp",
                description: "Deep structural cracks appearing on the main entry ramp.",
                status: "In Progress",
                priority: "Medium",
                region: "Kukatpally",
                address: "Kukatpally Flyover Ramp, Hyderabad",
                damage_type: "Crack",
                severity_level: "MEDIUM",
                severity_score: "2.1",
                confidence: "0.86",
                latitude: 17.4890,
                longitude: 78.3905,
                citizen_id: "user-citizen-1",
                citizen_name: "Prasanna Kumar",
                assigned_officer_id: "user-official-1",
                officer_name: "Officer Ravi Kumar",
                created_at: getPastDate(3)
            },
            {
                id: "comp-3",
                complaint_number: "COMP-384025",
                title: "Damaged Road shoulder",
                description: "Erosion of road shoulders near the divider.",
                status: "Resolved",
                priority: "Low",
                region: "Kukatpally",
                address: "KPHB Phase 1 road, Hyderabad",
                damage_type: "Crack",
                severity_level: "LOW",
                severity_score: "0.8",
                confidence: "0.79",
                latitude: 17.4812,
                longitude: 78.3855,
                citizen_id: "user-citizen-1",
                citizen_name: "Prasanna Kumar",
                assigned_officer_id: "user-official-1",
                officer_name: "Officer Ravi Kumar",
                created_at: getPastDate(5)
            },
            {
                id: "comp-4",
                complaint_number: "COMP-992019",
                title: "Pothole block near Rythu Bazar",
                description: "Large crater near the fruit market entrance causing water stagnation.",
                status: "Pending",
                priority: "High",
                region: "Mehdipatnam",
                address: "Entrance of Rythu Bazar, Mehdipatnam, Hyderabad",
                damage_type: "Pothole",
                severity_level: "HIGH",
                severity_score: "3.8",
                confidence: "0.88",
                latitude: 17.3912,
                longitude: 78.4382,
                citizen_id: "user-citizen-1",
                citizen_name: "Prasanna Kumar",
                created_at: getPastDate(2)
            },
            {
                id: "comp-5",
                complaint_number: "COMP-440281",
                title: "Crack on Outer Ring Road access lane",
                description: "Long structural fracture across the access lane.",
                status: "Pending",
                priority: "Medium",
                region: "Gachibowli",
                address: "ORR Access Road Lane 2, Gachibowli, Hyderabad",
                damage_type: "Crack",
                severity_level: "MEDIUM",
                severity_score: "1.8",
                confidence: "0.83",
                citizen_id: "user-citizen-1",
                citizen_name: "Prasanna Kumar",
                created_at: getPastDate(4)
            }
        ],
        workOrders: [
            {
                id: "wo-1",
                complaint_id: "comp-2",
                team_id: "team-1",
                instructions: "Seal cracks and inspect structural integrity of flyover columns.",
                priority: "Medium",
                status: "Assigned",
                issued_by: "user-official-1",
                team_name: "Alpha Crew",
                complaint_number: "COMP-110482",
                created_at: getPastDate(2)
            }
        ],
        responses: [
            {
                id: "resp-1",
                complaint_id: "comp-3",
                officer_id: "user-official-1",
                officer_name: "Officer Ravi Kumar",
                message: "Maintenance crew assigned to repair road shoulder.",
                status_changed_to: "In Progress",
                created_at: getPastDate(4)
            },
            {
                id: "resp-2",
                complaint_id: "comp-3",
                officer_id: "user-official-1",
                officer_name: "Officer Ravi Kumar",
                message: "Crews have patched the road shoulder and verified status. Marking as resolved.",
                status_changed_to: "Resolved",
                created_at: getPastDate(3)
            }
        ],
        detections: []
    };

    try {
        console.log(`Connecting to database for seeding: ${MONGODB_URI}`);
        
        // Short timeout (3 seconds) to fail fast and toggle mock mode if database is offline
        await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
        console.log('Connected to MongoDB. Wiping existing database...');

        await User.deleteMany({});
        await Complaint.deleteMany({});
        await Response.deleteMany({});
        await Team.deleteMany({});
        await WorkOrder.deleteMany({});
        await Detection.deleteMany({});

        console.log('Inserting seed records into MongoDB...');

        // Insert users
        const userMap = {};
        for (const u of mockData.users) {
            const userObj = new User({
                name: u.name,
                email: u.email,
                password: u.password,
                role: u.role,
                region: u.region,
                city: u.city
            });
            await userObj.save();
            userMap[u.id] = userObj._id;
        }

        // Insert teams
        const teamMap = {};
        for (const t of mockData.teams) {
            const teamObj = new Team({
                name: t.name,
                lead_name: t.lead_name,
                region: t.region,
                status: t.status,
                current_location: t.current_location,
                tasks_count: t.tasks_count
            });
            await teamObj.save();
            teamMap[t.id] = teamObj._id;
        }

        // Insert complaints
        const complaintMap = {};
        for (const c of mockData.complaints) {
            const compObj = new Complaint({
                complaint_number: c.complaint_number,
                title: c.title,
                description: c.description,
                status: c.status,
                priority: c.priority,
                region: c.region,
                address: c.address,
                damage_type: c.damage_type,
                severity_level: c.severity_level,
                severity_score: c.severity_score,
                confidence: c.confidence,
                latitude: c.latitude,
                longitude: c.longitude,
                citizen_id: userMap[c.citizen_id],
                assigned_officer_id: c.assigned_officer_id ? userMap[c.assigned_officer_id] : undefined
            });
            compObj.createdAt = new Date(c.created_at);
            await compObj.save();
            complaintMap[c.id] = compObj._id;
        }

        // Insert work orders
        for (const wo of mockData.workOrders) {
            const woObj = new WorkOrder({
                complaint_id: complaintMap[wo.complaint_id],
                team_id: teamMap[wo.team_id],
                instructions: wo.instructions,
                priority: wo.priority,
                status: wo.status,
                issued_by: userMap[wo.issued_by]
            });
            woObj.createdAt = new Date(wo.created_at);
            await woObj.save();
        }

        // Insert responses
        for (const r of mockData.responses) {
            const rObj = new Response({
                complaint_id: complaintMap[r.complaint_id],
                officer_id: userMap[r.officer_id],
                message: r.message,
                status_changed_to: r.status_changed_to
            });
            rObj.createdAt = new Date(r.created_at);
            await rObj.save();
        }

        console.log('\n=========================================');
        console.log('MongoDB database seeding completed successfully!');
        console.log('Demo Citizen Account:  prasanna@test.com / Test@123');
        console.log('Demo Official Account: ravi@telangana.gov.in / Official@123');
        console.log('=========================================\n');

        mongoose.connection.close();
    } catch (error) {
        console.warn('\n-----------------------------------------');
        console.warn('MongoDB connection offline. Switching to local file-based database seeder.');
        console.warn('Reason:', error.message);
        console.warn('-----------------------------------------\n');

        try {
            const uploadDir = path.join(__dirname, '..', 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(mockData, null, 2), 'utf8');

            console.log('=========================================');
            console.log('Local JSON File Seeding completed successfully!');
            console.log(`Mock Database saved to: ${MOCK_DB_PATH}`);
            console.log('Demo Citizen Account:  prasanna@test.com / Test@123');
            console.log('Demo Official Account: ravi@telangana.gov.in / Official@123');
            console.log('=========================================\n');
            process.exit(0);
        } catch (fileErr) {
            console.error('Failed to write mock JSON seed file:', fileErr);
            process.exit(1);
        }
    }
}

seed();
