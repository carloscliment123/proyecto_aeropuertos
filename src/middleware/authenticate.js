import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError.js';
import { findById } from '../repositories/userRepository.js';

export async function authenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization ?? '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    throw new AppError(401, 'UNAUTHORIZED', 'Autenticación requerida.');
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
  } catch {
    throw new AppError(401, 'UNAUTHORIZED', 'Token no válido o caducado.');
  }

  // El rol se consulta en la BD, no se fía del token
  const user = await findById(Number(payload.sub));
  if (!user) {
    throw new AppError(401, 'UNAUTHORIZED', 'Token no válido o caducado.');
  }

  req.user = user;
  next();
}