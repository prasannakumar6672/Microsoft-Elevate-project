import { teamService } from '../services/team.service.js';

export const listTeams = async (req, res) => {
  const result = await teamService.listTeams(req.user);
  return res.json(result);
};

export const issueWorkOrder = async (req, res) => {
  const result = await teamService.issueWorkOrder(req.user, req.body);
  return res.status(201).json(result);
};

export const listWorkOrders = async (req, res) => {
  const result = await teamService.listWorkOrders();
  return res.json(result);
};
