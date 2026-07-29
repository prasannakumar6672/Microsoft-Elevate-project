import { complaintService } from '../services/complaint.service.js';

export const createComplaint = async (req, res) => {
  const result = await complaintService.createComplaint(req.user, req.body);
  return res.status(201).json(result);
};

export const getMyComplaints = async (req, res) => {
  const result = await complaintService.getCitizenComplaints(req.user.id);
  return res.json(result);
};

export const getAllComplaints = async (req, res) => {
  const result = await complaintService.getAllComplaints(req.user, req.query);
  return res.json(result);
};

export const getComplaintById = async (req, res) => {
  const result = await complaintService.getComplaintById(req.params.id);
  return res.json(result);
};

export const updateComplaintStatus = async (req, res) => {
  const { status } = req.body;
  const result = await complaintService.updateComplaintStatus(req.params.id, status, req.user);
  return res.json(result);
};

export const respondToComplaint = async (req, res) => {
  const { message, status_changed_to } = req.body;
  const result = await complaintService.respondToComplaint(req.params.id, message, status_changed_to, req.user);
  return res.status(201).json(result);
};

export const getResponses = async (req, res) => {
  const result = await complaintService.getResponsesForComplaint(req.params.id);
  return res.json(result);
};
