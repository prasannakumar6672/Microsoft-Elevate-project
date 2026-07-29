import { WorkOrder } from '../../models/WorkOrder.model.js';

export class WorkOrderRepository {
  async create(data) {
    const workOrder = new WorkOrder(data);
    await workOrder.save();

    const populated = await WorkOrder.findById(workOrder._id)
      .populate('complaint_id', 'complaint_number title')
      .populate('team_id', 'name lead_name');

    return populated;
  }

  async findAll() {
    return await WorkOrder.find({})
      .populate('complaint_id', 'complaint_number title region')
      .populate('team_id', 'name lead_name')
      .sort({ createdAt: -1 });
  }
}
