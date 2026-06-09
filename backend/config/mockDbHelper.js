import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MOCK_DB_PATH = path.join(__dirname, '..', 'uploads', 'mock_db.json');

// Default initial seed data for local fallback
const DEFAULT_SEEDS = {
    users: [
        {
            id: "user-citizen-1",
            name: "Prasanna Kumar",
            email: "prasanna@test.com",
            role: "citizen",
            city: "Hyderabad"
        },
        {
            id: "user-official-1",
            name: "Officer Ravi Kumar",
            email: "ravi@telangana.gov.in",
            role: "official",
            region: "Kukatpally",
            city: "Hyderabad"
        },
        {
            id: "user-official-2",
            name: "Officer Sunita Rao",
            email: "sunita@telangana.gov.in",
            role: "official",
            region: "Mehdipatnam",
            city: "Hyderabad"
        },
        {
            id: "user-official-3",
            name: "Officer Priya Sharma",
            email: "priya@telangana.gov.in",
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
            created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
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
            created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
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
            created_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString()
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
            created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString()
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
            latitude: 17.4412,
            longitude: 78.3495,
            citizen_id: "user-citizen-1",
            citizen_name: "Prasanna Kumar",
            created_at: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString()
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
            created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString()
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
            created_at: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString()
        },
        {
            id: "resp-2",
            complaint_id: "comp-3",
            officer_id: "user-official-1",
            officer_name: "Officer Ravi Kumar",
            message: "Crews have patched the road shoulder and verified status. Marking as resolved.",
            status_changed_to: "Resolved",
            created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
        }
    ],
    detections: []
};

// Check if mongoose is disconnected or if we're forced to mock mode
export const isMock = () => {
    return mongoose.connection.readyState !== 1;
};

// Load database from file or return default seeds
export const loadMockDB = () => {
    try {
        if (fs.existsSync(MOCK_DB_PATH)) {
            const data = fs.readFileSync(MOCK_DB_PATH, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error reading mock database file:', err);
    }
    
    // Create the directory if missing
    const uploadDir = path.dirname(MOCK_DB_PATH);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Save seeds initially
    saveMockDB(DEFAULT_SEEDS);
    return DEFAULT_SEEDS;
};

// Save database state back to file
export const saveMockDB = (data) => {
    try {
        fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing to mock database file:', err);
        return false;
    }
};
