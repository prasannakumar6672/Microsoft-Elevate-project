import { authService } from '../services/auth.service.js';

export const register = async (req, res) => {
  const result = await authService.register(req.body);
  return res.status(201).json(result);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  return res.json(result);
};
