import { AppError } from '../errors/AppError.js';

const ROLES = ['user', 'admin'];

export function validateRole(body = {}) {
  const role = typeof body.role === 'string' ? body.role.trim() : '';

  if (!ROLES.includes(role)) {
    throw new AppError(422, 'VALIDATION_ERROR', 'Los datos enviados no son válidos.', {
      role: "El rol debe ser 'user' o 'admin'.",
    });
  }
  return { role };
}