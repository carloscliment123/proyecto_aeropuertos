import { AppError } from '../errors/AppError.js';

export function validateCity(body = {}) {
  const details = {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const country = typeof body.country === 'string' ? body.country.trim() : '';

  if (!name || name.length > 120)
    details.name = 'El nombre es obligatorio (máximo 120 caracteres).';
  if (!country || country.length > 120)
    details.country = 'El país es obligatorio (máximo 120 caracteres).';

  if (Object.keys(details).length > 0) {
    throw new AppError(422, 'VALIDATION_ERROR', 'Los datos enviados no son válidos.', details);
  }
  return { name, country };
}