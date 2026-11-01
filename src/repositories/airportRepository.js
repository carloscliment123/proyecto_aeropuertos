import { pool } from '../config/database.js';

const SELECT_FULL = `
  SELECT a.id, a.iata_code AS iataCode, a.name, a.city_id AS cityId,
         c.name AS cityName, c.country
    FROM airports a
    JOIN cities c ON c.id = a.city_id`;

export async function findAll(cityId) {
  if (cityId) {
    const [rows] = await pool.query(
      `${SELECT_FULL} WHERE a.city_id = ? ORDER BY a.iata_code`,
      [cityId]
    );
    return rows;
  }
  const [rows] = await pool.query(`${SELECT_FULL} ORDER BY a.iata_code`);
  return rows;
}

export async function findById(id) {
  const [rows] = await pool.query(`${SELECT_FULL} WHERE a.id = ?`, [id]);
  return rows[0] ?? null;
}

export async function findByCityId(cityId) {
  const [rows] = await pool.query(
    `SELECT id, iata_code AS iataCode, name, city_id AS cityId
       FROM airports WHERE city_id = ? ORDER BY iata_code`,
    [cityId]
  );
  return rows;
}

export async function create({ iataCode, name, cityId }) {
  const [result] = await pool.query(
    'INSERT INTO airports (iata_code, name, city_id) VALUES (?, ?, ?)',
    [iataCode, name, cityId]
  );
  return { id: result.insertId, iataCode, name, cityId };
}

export async function update(id, { iataCode, name, cityId }) {
  await pool.query(
    'UPDATE airports SET iata_code = ?, name = ?, city_id = ? WHERE id = ?',
    [iataCode, name, cityId, id]
  );
  return { id, iataCode, name, cityId };
}