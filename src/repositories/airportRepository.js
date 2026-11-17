import { pool } from '../config/database.js';

const SELECT_FULL = `
  SELECT a.id, a.iata_code AS iataCode, a.name, a.city_id AS cityId,
         c.name AS cityName, c.country
    FROM airports a
    JOIN cities c ON c.id = a.city_id`;

export async function findAll({ cityId = null, search = null } = {}) {
  let sql = SELECT_FULL;
  const conditions = [];
  const params = [];

  if (cityId) {
    conditions.push('a.city_id = ?');
    params.push(cityId);
  }

  if (search) {
    const escapedSearch = search.replace(/[\\%_]/g, '\\$&');
    const likePattern = `%${escapedSearch}%`;
    conditions.push('(a.name LIKE ? OR a.iata_code LIKE ?)');
    params.push(likePattern, likePattern);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY a.id';

  const [rows] = await pool.query(sql, params);
  return rows;
}

export async function findById(id) {
  const [rows] = await pool.query(`${SELECT_FULL} WHERE a.id = ?`, [id]);
  return rows[0] ?? null;
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

export async function remove(id) {
  await pool.query('DELETE FROM airports WHERE id = ?', [id]);
}