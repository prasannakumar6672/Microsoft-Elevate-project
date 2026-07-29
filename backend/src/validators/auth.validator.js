import { BadRequestError } from '../errors/BadRequestError.js';

export function validateRegister(req) {
  const { name, email, password } = req.body;
  if (!name || !name.trim()) {
    throw new BadRequestError('Full name is required.');
  }
  if (!email || !email.trim()) {
    throw new BadRequestError('Email address is required.');
  }
  if (!password || password.length < 6) {
    throw new BadRequestError('Password must be at least 6 characters long.');
  }
}

export function validateLogin(req) {
  const { email, password } = req.body;
  if (!email || !email.trim()) {
    throw new BadRequestError('Email address is required.');
  }
  if (!password) {
    throw new BadRequestError('Password is required.');
  }
}
