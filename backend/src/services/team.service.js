import {
  getTeamRepository,
  getWorkOrderRepository,
  getComplaintRepository,
} from '../repositories/index.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export class TeamService {
  async listTeams(user) {
    const teamRepo = getTeamRepository();
    const region = user.role === 'official' ? user.region : undefined;
    return await teamRepo.findAll(region);
  }

  async issueWorkOrder(user, data) {
    const { complaint_id, team_id, instructions, priority } = data;

    const complaintRepo = getComplaintRepository();
    const teamRepo = getTeamRepository();
    const workOrderRepo = getWorkOrderRepository();

    const complaint = await complaintRepo.findById(complaint_id);
    if (!complaint) {
      throw new NotFoundError('Complaint not found.');
    }

    const team = await teamRepo.findById(team_id);
    if (!team) {
      throw new NotFoundError('Field team not found.');
    }

    const workOrder = await workOrderRepo.create({
      complaint_id,
      team_id,
      instructions,
      priority,
      status: 'Assigned',
      issued_by: user.id,
      team_name: team.name,
      complaint_number: complaint.complaint_number,
    });

    await teamRepo.incrementTaskCount(team_id);
    await complaintRepo.updateStatus(complaint_id, 'In Progress', user.id);

    return workOrder;
  }

  async listWorkOrders() {
    const workOrderRepo = getWorkOrderRepository();
    return await workOrderRepo.findAll();
  }
}

export const teamService = new TeamService();
