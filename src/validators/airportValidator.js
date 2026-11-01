import { AppError } from '../errors/AppError.js';

export function validateAirport(body = {}) {
  const details = {};
  const iataCode =
    typeof body.iataCode === 'string' ? body.iataCode.trim().toUpperCase() : '';
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const cityId = body.cityId;

  if (!/^[A-Z]{3}$/.test(iataCode))
    details.iataCode = 'El código IATA debe tener exactamente tres letras.';
  if (!name || name.length > 180)
    details.name = 'El nombre es obligatorio (máximo 180 caracteres).';
  if (!Number.isInteger(cityId) || cityId < 1)
    details.cityId = 'cityId debe ser un entero positivo.';

  if (Object.keys(details).length > 0) {
    throw new AppError(422, 'VALIDATION_ERROR', 'Los datos enviados no son válidos.', details);
  }
  return { iataCode, name, cityId };
}