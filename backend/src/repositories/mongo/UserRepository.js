import { User } from '../../models/User.model.js';

export class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email: email.toLowerCase().trim() });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async create(userData) {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  }
}
