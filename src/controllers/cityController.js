import * as cityRepo from '../repositories/cityRepository.js';
import * as airportRepo from '../repositories/airportRepository.js';
import { AppError } from '../errors/AppError.js';
import { parseId } from '../validators/commonValidator.js';
import { validateCity } from '../validators/cityValidator.js';

export async function list(req, res) {
  const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
  res.json(await cityRepo.findAll(search));
}

export async function listWithAirports(req, res) {
  res.json(await cityRepo.findWithAirports());
}

export async function listAirports(req, res) {
  const id = parseId(req.params.id);
  const city = await cityRepo.findById(id);
  if (!city) throw new AppError(404, 'CITY_NOT_FOUND', 'La ciudad no existe.');
  res.json(await airportRepo.findByCityId(id));
}

export async function create(req, res) {
  const data = validateCity(req.body);
  res.status(201).json(await cityRepo.create(data));
}

export async function update(req, res) {
  const id = parseId(req.params.id);
  const city = await cityRepo.findById(id);
  if (!city) throw new AppError(404, 'CITY_NOT_FOUND', 'La ciudad no existe.');
  const data = validateCity(req.body);
  res.json(await cityRepo.update(id, data));
}