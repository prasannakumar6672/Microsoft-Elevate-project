import {
  getComplaintRepository,
  getDetectionRepository,
  getResponseRepository,
} from '../repositories/index.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export class ComplaintService {
  async createComplaint(user, data) {
    const complaintRepo = getComplaintRepository();
    const detectionRepo = getDetectionRepository();

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
      region,
    } = data;

    const randNum = Math.floor(100000 + Math.random() * 900000);
    const complaint_number = `COMP-${randNum}`;

    let aiFields = {
      damage_type,
      severity_level,
      severity_score,
      confidence,
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
      address,
      region,
    };

    if (detection_id) {
      const detection = await detectionRepo.findById(detection_id);
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

    const priority =
      aiFields.severity_level === 'HIGH' ? 'High' : aiFields.severity_level === 'MEDIUM' ? 'Medium' : 'Low';

    const complaintData = {
      complaint_number,
      title,
      description,
      status: 'Pending',
      priority,
      region: aiFields.region || user.region || 'Kukatpally',
      address: aiFields.address,
      damage_type: aiFields.damage_type,
      severity_level: aiFields.severity_level,
      severity_score: aiFields.severity_score,
      confidence: aiFields.confidence,
      latitude: aiFields.latitude,
      longitude: aiFields.longitude,
      citizen_id: user.id,
      citizen_name: user.name,
      annotated_image_url: aiFields.annotated_image_url,
    };

    return await complaintRepo.create(complaintData);
  }

  async getCitizenComplaints(citizenId) {
    const complaintRepo = getComplaintRepository();
    return await complaintRepo.findByCitizenId(citizenId);
  }

  async getAllComplaints(user, filters) {
    const complaintRepo = getComplaintRepository();
    const queryFilters = { ...filters };

    if (user.role === 'official' && user.region) {
      queryFilters.region = user.region;
    }

    return await complaintRepo.findAll(queryFilters);
  }

  async getComplaintById(id) {
    const complaintRepo = getComplaintRepository();
    const complaint = await complaintRepo.findById(id);
    if (!complaint) {
      throw new NotFoundError('Complaint not found.');
    }
    return complaint;
  }

  async updateComplaintStatus(id, status, user) {
    const complaintRepo = getComplaintRepository();
    const officerId = user.role === 'official' ? user.id : undefined;

    const updated = await complaintRepo.updateStatus(id, status, officerId);
    if (!updated) {
      throw new NotFoundError('Complaint not found.');
    }
    return updated;
  }

  async respondToComplaint(id, message, statusChangedTo, user) {
    const complaintRepo = getComplaintRepository();
    const responseRepo = getResponseRepository();

    const complaint = await complaintRepo.findById(id);
    if (!complaint) {
      throw new NotFoundError('Complaint not found.');
    }

    const responseLog = await responseRepo.create({
      complaint_id: complaint.id || complaint._id?.toString(),
      officer_id: user.id,
      officer_name: user.name,
      message,
      status_changed_to: statusChangedTo,
    });

    if (statusChangedTo) {
      await complaintRepo.updateStatus(id, statusChangedTo, user.id);
    }

    return responseLog;
  }

  async getResponsesForComplaint(id) {
    const responseRepo = getResponseRepository();
    return await responseRepo.findByComplaintId(id);
  }
}

export const complaintService = new ComplaintService();
