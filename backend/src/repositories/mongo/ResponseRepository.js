import { Response } from '../../models/Response.model.js';

export class ResponseRepository {
  async create(data) {
    const response = new Response(data);
    await response.save();
    return await Response.findById(response._id).populate('officer_id', 'name');
  }

  async findByComplaintId(complaintId) {
    return await Response.find({ complaint_id: complaintId })
      .populate('officer_id', 'name')
      .sort({ createdAt: 1 });
  }
}
