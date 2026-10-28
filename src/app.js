import express from 'express';
import { pool } from './config/database.js';

const app = express();
app.use(express.json());

// Ruta temporal para comprobar que todo conecta
app.get('/api/health', async (req, res) => {
  const [rows] = await pool.query('SELECT COUNT(*) AS cities FROM cities');
  res.json({ status: 'ok', cities: rows[0].cities });
});

export default app;