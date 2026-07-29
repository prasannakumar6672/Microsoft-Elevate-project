import { loadMockDB, saveMockDB } from '../../config/mockDbHelper.js';

export class MemoryResponseRepository {
  async create(data) {
    const db = loadMockDB();
    const responseLog = {
      id: 'resp-' + Date.now(),
      created_at: new Date().toISOString(),
      ...data,
    };
    db.responses.push(responseLog);
    saveMockDB(db);
    return responseLog;
  }

  async findByComplaintId(complaintId) {
    const db = loadMockDB();
    const responses = db.responses.filter(r => r.complaint_id === complaintId);
    return responses.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }
}
