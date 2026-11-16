import bcrypt from 'bcrypt';
import { pool } from '../src/config/database.js';

const NEW_PASSWORD = 'password';
const ADMIN_EMAIL  = 'admin@aeropuertos.test';

const hash = await bcrypt.hash(NEW_PASSWORD, 10);
const [result] = await pool.query(
  'UPDATE users SET password_hash = ? WHERE email = ?',
  [hash, ADMIN_EMAIL]
);

if (result.affectedRows === 0) {
  console.error('No se encontró el usuario admin. Comprueba el email.');
} else {
  console.log(`Contraseña actualizada para ${ADMIN_EMAIL}`);
  console.log(`Nueva contraseña: ${NEW_PASSWORD}`);
}

pool.end();
