import { AppError } from '../errors/AppError.js';

export function parseId(value) {
  if (!/^[1-9]\d*$/.test(String(value))) {
    throw new AppError(404, 'NOT_FOUND', 'Recurso no encontrado.');
  }
  return Number(value);
}

export function parseOptionalCityId(value) {
  if (value === undefined) return null;
  if (!/^[1-9]\d*$/.test(String(value))) {
    throw new AppError(422, 'VALIDATION_ERROR', 'Los datos enviados no son válidos.', {
      cityId: 'cityId debe ser un entero positivo.',
    });
  }
  return Number(value);
}