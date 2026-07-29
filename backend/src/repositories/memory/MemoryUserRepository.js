import { loadMockDB, saveMockDB } from '../../config/mockDbHelper.js';

export class MemoryUserRepository {
  async findByEmail(email) {
    const db = loadMockDB();
    const emailLower = email.toLowerCase().trim();
    return db.users.find(u => u.email.toLowerCase() === emailLower) || null;
  }

  async findById(id) {
    const db = loadMockDB();
    return db.users.find(u => u.id === id) || null;
  }

  async create(userData) {
    const db = loadMockDB();
    const newUser = {
      id: 'user-new-' + Date.now(),
      ...userData,
    };
    db.users.push(newUser);
    saveMockDB(db);
    return newUser;
  }
}
