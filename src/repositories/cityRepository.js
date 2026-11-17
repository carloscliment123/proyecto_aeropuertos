import { pool } from '../config/database.js';

export async function findAll(search, { limit, offset }) {
  if (!search) {
    const [rows] = await pool.query(
      'SELECT id, name, country FROM cities ORDER BY name LIMIT ? OFFSET ?',
      [limit, offset]
    );
    return rows;
  }
  const pattern = `%${search.replace(/[\\%_]/g, '\\$&')}%`;
  const [rows] = await pool.query(
    'SELECT id, name, country FROM cities WHERE name LIKE ? ORDER BY name LIMIT ? OFFSET ?',
    [pattern, limit, offset]
  );
  return rows;
}

export async function findWithAirports() {
  const [rows] = await pool.query(
    `SELECT c.id, c.name, c.country, COUNT(a.id) AS airportCount
       FROM cities c
       JOIN airports a ON a.city_id = c.id
      GROUP BY c.id, c.name, c.country
      ORDER BY c.name`
  );
  return rows.map((r) => ({ ...r, airportCount: Number(r.airportCount) }));
}

export async function findById(id) {
  const [rows] = await pool.query(
    'SELECT id, name, country FROM cities WHERE id = ?',
    [id]
  );
  return rows[0] ?? null;
}

export async function create({ name, country }) {
  const [result] = await pool.query(
    'INSERT INTO cities (name, country) VALUES (?, ?)',
    [name, country]
  );
  return { id: result.insertId, name, country };
}

export async function update(id, { name, country }) {
  await pool.query(
    'UPDATE cities SET name = ?, country = ? WHERE id = ?',
    [name, country, id]
  );
  return { id, name, country };
}

export async function remove(id) {
  await pool.query('DELETE FROM cities WHERE id = ?', [id]);
}