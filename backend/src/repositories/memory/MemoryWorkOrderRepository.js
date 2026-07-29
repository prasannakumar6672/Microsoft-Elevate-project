import { loadMockDB, saveMockDB } from '../../config/mockDbHelper.js';

export class MemoryWorkOrderRepository {
  async create(data) {
    const db = loadMockDB();
    const newWorkOrder = {
      id: 'wo-' + Date.now(),
      status: 'Assigned',
      created_at: new Date().toISOString(),
      ...data,
    };
    db.workOrders.push(newWorkOrder);
    saveMockDB(db);
    return newWorkOrder;
  }

  async findAll() {
    const db = loadMockDB();
    return [...db.workOrders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
}
