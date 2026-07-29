import { loadMockDB, saveMockDB } from '../../config/mockDbHelper.js';

export class MemoryComplaintRepository {
  async create(data) {
    const db = loadMockDB();
    const randNum = Math.floor(100000 + Math.random() * 900000);
    const newComplaint = {
      id: 'comp-' + Date.now(),
      complaint_number: data.complaint_number || `COMP-${randNum}`,
      status: 'Pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...data,
    };
    db.complaints.push(newComplaint);
    saveMockDB(db);
    return newComplaint;
  }

  async findByCitizenId(citizenId) {
    const db = loadMockDB();
    return db.complaints.filter(c => c.citizen_id === citizenId);
  }

  async findAll(queryFilters = {}) {
    const db = loadMockDB();
    let list = [...db.complaints];

    const { region, status, severity, search } = queryFilters;

    if (region) list = list.filter(c => c.region === region);
    if (status) list = list.filter(c => c.status === status);
    if (severity) list = list.filter(c => (c.severity_level || c.priority) === severity);
    if (search) {
      const searchLower = String(search).toLowerCase();
      list = list.filter(c =>
        (c.title && c.title.toLowerCase().includes(searchLower)) ||
        (c.description && c.description.toLowerCase().includes(searchLower)) ||
        (c.complaint_number && c.complaint_number.toLowerCase().includes(searchLower))
      );
    }

    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  async findById(id) {
    const db = loadMockDB();
    return db.complaints.find(c => c.id === id) || null;
  }

  async updateStatus(id, status, officerId) {
    const db = loadMockDB();
    const complaint = db.complaints.find(c => c.id === id);
    if (!complaint) return null;

    complaint.status = status;
    complaint.updated_at = new Date().toISOString();
    if (officerId) complaint.assigned_officer_id = officerId;

    saveMockDB(db);
    return complaint;
  }

  async countStats(query = {}) {
    const db = loadMockDB();
    let complaints = [...db.complaints];
    if (query.region) {
      complaints = complaints.filter(c => c.region === query.region);
    }

    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'Pending').length;
    const in_progress = complaints.filter(c => c.status === 'In Progress').length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;

    return { total, pending, in_progress, resolved };
  }
}
