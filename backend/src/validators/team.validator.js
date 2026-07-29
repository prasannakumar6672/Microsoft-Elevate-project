import { BadRequestError } from '../errors/BadRequestError.js';

export function validateIssueWorkOrder(req) {
  const { complaint_id, team_id, priority } = req.body;
  if (!complaint_id) {
    throw new BadRequestError('Complaint ID is required.');
  }
  if (!team_id) {
    throw new BadRequestError('Team ID is required.');
  }
  if (!priority) {
    throw new BadRequestError('Priority is required.');
  }
}
