import { AppError } from '../errors/AppError.js';

export function authorizeAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    throw new AppError(403, 'FORBIDDEN', 'No tienes permisos para esta operación.');
  }
  next();
}