import { Team } from '../../models/Team.model.js';

export class TeamRepository {
  async findAll(region) {
    const query = region ? { region } : {};
    return await Team.find(query);
  }

  async findById(id) {
    return await Team.findById(id);
  }

  async incrementTaskCount(id) {
    const team = await Team.findById(id);
    if (team) {
      const current = parseInt(team.tasks_count || '0', 10);
      team.tasks_count = String(current + 1);
      await team.save();
    }
    return team;
  }
}
