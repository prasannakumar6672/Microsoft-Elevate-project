import { loadMockDB, saveMockDB } from '../../config/mockDbHelper.js';

export class MemoryTeamRepository {
  async findAll(region) {
    const db = loadMockDB();
    let teamsList = [...db.teams];
    if (region) teamsList = teamsList.filter(t => t.region === region);
    return teamsList;
  }

  async findById(id) {
    const db = loadMockDB();
    return db.teams.find(t => t.id === id) || null;
  }

  async incrementTaskCount(id) {
    const db = loadMockDB();
    const team = db.teams.find(t => t.id === id);
    if (team) {
      const current = parseInt(team.tasks_count || '0', 10);
      team.tasks_count = String(current + 1);
      saveMockDB(db);
    }
    return team;
  }
}
