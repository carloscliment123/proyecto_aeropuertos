import express from 'express';
import { pool } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import airportRoutes from './routes/airportRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

app.get('/api/health', async (req, res) => {
  const [rows] = await pool.query('SELECT COUNT(*) AS cities FROM cities');
  res.json({ status: 'ok', cities: rows[0].cities });
});

app.use('/api/auth', authRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/airports', airportRoutes);

app.use(notFound);     
app.use(errorHandler);  

export default app;