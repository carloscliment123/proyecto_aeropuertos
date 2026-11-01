import * as airportRepo from '../repositories/airportRepository.js';
import * as cityRepo from '../repositories/cityRepository.js';
import { AppError } from '../errors/AppError.js';
import { parseId, parseOptionalCityId } from '../validators/commonValidator.js';
import { validateAirport } from '../validators/airportValidator.js';

// Traduce errores de MySQL a errores HTTP del contrato
function translateDbError(err) {
  if (err.code === 'ER_DUP_ENTRY')
    return new AppError(409, 'IATA_CODE_ALREADY_EXISTS', 'El código IATA ya está en uso.');
  if (err.code === 'ER_NO_REFERENCED_ROW_2')
    return new AppError(404, 'CITY_NOT_FOUND', 'La ciudad no existe.');
  return err;
}

export async function list(req, res) {
  const cityId = parseOptionalCityId(req.query.cityId);
  res.json(await airportRepo.findAll(cityId));
}

export async function getOne(req, res) {
  const airport = await airportRepo.findById(parseId(req.params.id));
  if (!airport) throw new AppError(404, 'AIRPORT_NOT_FOUND', 'El aeropuerto no existe.');
  res.json(airport);
}

export async function create(req, res) {
  const data = validateAirport(req.body);
  if (!(await cityRepo.findById(data.cityId)))
    throw new AppError(404, 'CITY_NOT_FOUND', 'La ciudad no existe.');
  try {
    res.status(201).json(await airportRepo.create(data));
  } catch (err) {
    throw translateDbError(err);
  }
}

export async function update(req, res) {
  const id = parseId(req.params.id);
  if (!(await airportRepo.findById(id)))
    throw new AppError(404, 'AIRPORT_NOT_FOUND', 'El aeropuerto no existe.');
  const data = validateAirport(req.body);
  if (!(await cityRepo.findById(data.cityId)))
    throw new AppError(404, 'CITY_NOT_FOUND', 'La ciudad no existe.');
  try {
    res.json(await airportRepo.update(id, data));
  } catch (err) {
    throw translateDbError(err);
  }
}