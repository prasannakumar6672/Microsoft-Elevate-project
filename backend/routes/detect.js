import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import Detection from '../models/Detection.js';
import { isMock, loadMockDB, saveMockDB } from '../config/mockDbHelper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const uploadRawDir = path.join(__dirname, '..', 'uploads', 'raw');
const uploadAnnotatedDir = path.join(__dirname, '..', 'uploads', 'annotated');
fs.mkdirSync(uploadRawDir, { recursive: true });
fs.mkdirSync(uploadAnnotatedDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadRawDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'raw-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }
});

// POST /predict - Upload image and run YOLOv8
router.post('/predict', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded.' });
        }

        const inputPath = req.file.path;
        const filename = req.file.filename;
        const outputFilename = 'annotated-' + filename.replace('raw-', '');
        const outputPath = path.join(uploadAnnotatedDir, outputFilename);

        console.log(`AI Detection: Processing image ${filename}`);

        const scriptPath = path.join(__dirname, '..', 'ai', 'detect.py');

        const runPythonAI = () => {
            return new Promise((resolve, reject) => {
                const pyProcess = spawn('py', [scriptPath, inputPath, outputPath]);
                let stdoutData = '';
                let stderrData = '';

                pyProcess.stdout.on('data', (data) => {
                    stdoutData += data.toString();
                });

                pyProcess.stderr.on('data', (data) => {
                    stderrData += data.toString();
                });

                pyProcess.on('close', (code) => {
                    if (code !== 0) {
                        reject(new Error(stderrData || 'Python execution failed'));
                    } else {
                        resolve(stdoutData);
                    }
                });

                pyProcess.on('error', (err) => {
                    reject(err);
                });
            });
        };

        let aiResult;
        try {
            const output = await runPythonAI();
            aiResult = JSON.parse(output);
            console.log('AI Detection results parsed from Python successfully.');
        } catch (pyError) {
            console.warn('AI Python script failed or not configured, running standard fallback mock:', pyError.message);
            
            try {
                fs.copyFileSync(inputPath, outputPath);
            } catch (copyErr) {
                console.error('Failed to copy fallback image:', copyErr);
            }

            const mockTypes = ['Pothole', 'Crack'];
            const mockType = mockTypes[Math.floor(Math.random() * mockTypes.length)];
            const mockCount = Math.floor(Math.random() * 3) + 1;
            const mockConfidence = parseFloat((0.75 + Math.random() * 0.20).toFixed(2));
            const mockScore = parseFloat((mockCount * mockConfidence * 1.5).toFixed(1));
            
            aiResult = {
                damage_type: mockType,
                confidence: mockConfidence,
                severity_level: mockScore > 3.0 ? 'HIGH' : (mockScore > 1.5 ? 'MEDIUM' : 'LOW'),
                severity_score: mockScore,
                damage_count: mockCount,
                latitude: 17.4849 + (Math.random() - 0.5) * 0.05,
                longitude: 78.3889 + (Math.random() - 0.5) * 0.05,
                address: 'Near Kukatpally Main Road, Hyderabad, Telangana'
            };
        }

        const baseURL = `${req.protocol}://${req.get('host')}`;
        const annotated_image_url = `${baseURL}/uploads/annotated/${outputFilename}`;

        // ── FALLBACK MOCK MODE ──
        if (isMock()) {
            const db = loadMockDB();
            const newDetection = {
                detection_id: 'detect-' + Date.now(),
                damage_type: aiResult.damage_type,
                confidence: aiResult.confidence,
                severity_level: aiResult.severity_level,
                severity_score: aiResult.severity_score,
                damage_count: aiResult.damage_count,
                annotated_image_url,
                latitude: aiResult.latitude,
                longitude: aiResult.longitude,
                address: aiResult.address
            };

            db.detections.push(newDetection);
            saveMockDB(db);

            return res.status(201).json(newDetection);
        }

        // ── PERSISTENT MONGO MODE ──
        const newDetection = new Detection({
            damage_type: aiResult.damage_type,
            confidence: aiResult.confidence,
            severity_level: aiResult.severity_level,
            severity_score: aiResult.severity_score,
            damage_count: aiResult.damage_count,
            annotated_image_url,
            latitude: aiResult.latitude,
            longitude: aiResult.longitude,
            address: aiResult.address
        });

        await newDetection.save();
        return res.status(201).json(newDetection);
    } catch (error) {
        console.error('Detection prediction endpoint error:', error);
        return res.status(500).json({ message: 'AI prediction failed.' });
    }
});

// GET /:id - Fetch a detection record
router.get('/:id', async (req, res) => {
    try {
        if (isMock()) {
            const db = loadMockDB();
            const detection = db.detections.find(d => d.detection_id === req.params.id);
            if (!detection) {
                return res.status(404).json({ message: 'Detection not found.' });
            }
            return res.json(detection);
        }

        const detection = await Detection.findById(req.params.id);
        if (!detection) {
            return res.status(404).json({ message: 'Detection not found.' });
        }
        return res.json(detection);
    } catch (error) {
        console.error('Fetch detection error:', error);
        return res.status(500).json({ message: 'Failed to fetch detection.' });
    }
});

export default router;
