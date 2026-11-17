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

export function parsePagination(query) {
  const details = {};
  const rawPage = query.page ?? '1';
  const rawLimit = query.limit ?? '20';

  if (!/^[1-9]\d*$/.test(String(rawPage)))
    details.page = 'page debe ser un entero positivo.';
  if (!/^[1-9]\d*$/.test(String(rawLimit)) || Number(rawLimit) > 100)
    details.limit = 'limit debe ser un entero entre 1 y 100.';

  if (Object.keys(details).length > 0) {
    throw new AppError(422, 'VALIDATION_ERROR', 'Los datos enviados no son válidos.', details);
  }

  const page = Number(rawPage);
  const limit = Number(rawLimit);
  return { page, limit, offset: (page - 1) * limit };
}