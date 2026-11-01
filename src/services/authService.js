import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError.js';
import * as users from '../repositories/userRepository.js';

export async function register({ name, email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const id = await users.create({ name, email, passwordHash });
    return { id, name, email, role: 'user' };
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      throw new AppError(409, 'EMAIL_ALREADY_EXISTS', 'El correo ya está registrado.');
    }
    throw err;
  }
}

export async function login({ email, password }) {
  const user = await users.findByEmail(email);
  const ok = user && (await bcrypt.compare(password, user.password_hash));
  if (!ok) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'Credenciales incorrectas.');
  }

  const expiresIn = Number(process.env.JWT_EXPIRES_IN) || 3600;
  const accessToken = jwt.sign({ sub: String(user.id) }, process.env.JWT_SECRET, {
    expiresIn,
  });

  return {
    accessToken,
    tokenType: 'Bearer',
    expiresIn,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}