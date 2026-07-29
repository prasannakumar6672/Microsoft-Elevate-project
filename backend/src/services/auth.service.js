import bcrypt from 'bcryptjs';
import { getUserRepository } from '../repositories/index.js';
import { generateTokens } from '../utils/jwt.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

export class AuthService {
  async register(data) {
    const { name, email, password, phone, city } = data;
    const userRepo = getUserRepository();

    const existing = await userRepo.findByEmail(email);
    if (existing) {
      throw new BadRequestError('User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepo.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'citizen',
      city,
    });

    const { access_token, refresh_token } = generateTokens(newUser);

    return {
      access_token,
      refresh_token,
      role: newUser.role,
      name: newUser.name,
      user_id: newUser.id || newUser._id?.toString(),
    };
  }

  async login(email, password) {
    const userRepo = getUserRepository();
    const user = await userRepo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    let isMatch = false;
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = user.password === password;
    }

    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    const { access_token, refresh_token } = generateTokens(user);

    return {
      access_token,
      refresh_token,
      role: user.role,
      name: user.name,
      user_id: user.id || user._id?.toString(),
      region: user.region,
    };
  }
}

export const authService = new AuthService();
