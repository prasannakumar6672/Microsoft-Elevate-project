import { Complaint } from '../../models/Complaint.model.js';

export class ComplaintRepository {
  async create(data) {
    const complaint = new Complaint(data);
    await complaint.save();
    return await Complaint.findById(complaint._id)
      .populate('citizen_id', 'name email')
      .populate('assigned_officer_id', 'name email');
  }

  async findByCitizenId(citizenId) {
    return await Complaint.find({ citizen_id: citizenId })
      .populate('citizen_id', 'name email')
      .populate('assigned_officer_id', 'name email')
      .sort({ createdAt: -1 });
  }

  async findAll(queryFilters = {}) {
    const { region, status, severity, search } = queryFilters;
    const query = {};

    if (region) query.region = region;
    if (status) query.status = status;
    if (severity) query.severity_level = severity;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { complaint_number: { $regex: search, $options: 'i' } },
      ];
    }

    return await Complaint.find(query)
      .populate('citizen_id', 'name email')
      .populate('assigned_officer_id', 'name email')
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Complaint.findById(id)
      .populate('citizen_id', 'name email')
      .populate('assigned_officer_id', 'name email');
  }

  async updateStatus(id, status, officerId) {
    const complaint = await Complaint.findById(id);
    if (!complaint) return null;

    complaint.status = status;
    if (officerId) complaint.assigned_officer_id = officerId;
    await complaint.save();

    return await Complaint.findById(id)
      .populate('citizen_id', 'name email')
      .populate('assigned_officer_id', 'name email');
  }

  async countStats(query = {}) {
    const total = await Complaint.countDocuments(query);
    const pending = await Complaint.countDocuments({ ...query, status: 'Pending' });
    const in_progress = await Complaint.countDocuments({ ...query, status: 'In Progress' });
    const resolved = await Complaint.countDocuments({ ...query, status: 'Resolved' });

    return { total, pending, in_progress, resolved };
  }
}
