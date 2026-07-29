import { isDbConnected } from '../config/db.config.js';

// Mongo Repositories
import { UserRepository } from './mongo/UserRepository.js';
import { ComplaintRepository } from './mongo/ComplaintRepository.js';
import { DetectionRepository } from './mongo/DetectionRepository.js';
import { TeamRepository } from './mongo/TeamRepository.js';
import { WorkOrderRepository } from './mongo/WorkOrderRepository.js';
import { ResponseRepository } from './mongo/ResponseRepository.js';

// Memory Repositories
import { MemoryUserRepository } from './memory/MemoryUserRepository.js';
import { MemoryComplaintRepository } from './memory/MemoryComplaintRepository.js';
import { MemoryDetectionRepository } from './memory/MemoryDetectionRepository.js';
import { MemoryTeamRepository } from './memory/MemoryTeamRepository.js';
import { MemoryWorkOrderRepository } from './memory/MemoryWorkOrderRepository.js';
import { MemoryResponseRepository } from './memory/MemoryResponseRepository.js';

// Factory getter functions
export const getUserRepository = () => (isDbConnected() ? new UserRepository() : new MemoryUserRepository());
export const getComplaintRepository = () => (isDbConnected() ? new ComplaintRepository() : new MemoryComplaintRepository());
export const getDetectionRepository = () => (isDbConnected() ? new DetectionRepository() : new MemoryDetectionRepository());
export const getTeamRepository = () => (isDbConnected() ? new TeamRepository() : new MemoryTeamRepository());
export const getWorkOrderRepository = () => (isDbConnected() ? new WorkOrderRepository() : new MemoryWorkOrderRepository());
export const getResponseRepository = () => (isDbConnected() ? new ResponseRepository() : new MemoryResponseRepository());
