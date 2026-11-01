import { AppError } from '../errors/AppError.js';

export function notFound(req, res) {
  res.status(404).json({
    error: { code: 'NOT_FOUND', message: 'Ruta no encontrada.' },
  });
}

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    const error = { code: err.code, message: err.message };
    if (err.details) error.details = err.details;
    return res.status(err.status).json({ error });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: { code: 'BAD_REQUEST', message: 'JSON mal formado.' },
    });
  }

  console.error(err);
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Error interno del servidor.' },
  });
}