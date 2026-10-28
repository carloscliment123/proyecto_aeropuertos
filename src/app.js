import express from 'express';
import { pool } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

app.get('/api/health', async (req, res) => {
  const [rows] = await pool.query('SELECT COUNT(*) AS cities FROM cities');
  res.json({ status: 'ok', cities: rows[0].cities });
});

app.use('/api/auth', authRoutes);

app.use(notFound);      // siempre después de las rutas
app.use(errorHandler);  // siempre el último

export default app;