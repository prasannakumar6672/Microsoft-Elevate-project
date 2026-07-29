import { BadRequestError } from '../errors/BadRequestError.js';

export function validateCreateComplaint(req) {
  const { title } = req.body;
  if (!title || !title.trim()) {
    throw new BadRequestError('Complaint title is required.');
  }
}

export function validateUpdateStatus(req) {
  const { status } = req.body;
  if (!status) {
    throw new BadRequestError('Status field is required.');
  }
}

export function validateOfficialResponse(req) {
  const { message } = req.body;
  if (!message || !message.trim()) {
    throw new BadRequestError('Response message is required.');
  }
}
