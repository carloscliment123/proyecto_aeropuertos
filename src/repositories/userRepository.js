import { pool } from '../config/database.js';

export async function findByEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, name, email, password_hash, role FROM users WHERE email = ?',
    [email]
  );
  return rows[0] ?? null;
}

export async function findById(id) {
  const [rows] = await pool.query(
    'SELECT id, name, email, role FROM users WHERE id = ?',
    [id]
  );
  return rows[0] ?? null;
}

export async function create({ name, email, passwordHash }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, 'user'] 
  );
  return result.insertId;
}