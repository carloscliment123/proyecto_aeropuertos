import express from 'express';
import pool from './config/database.js';

import authRoutes from './routes/auth.routes.js';
import citiesRoutes from './routes/cities.routes.js';
import airportsRoutes from './routes/airports.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      message: error.message
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/cities', citiesRoutes);
app.use('/api/airports', airportsRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
});

app.use(errorHandler);

export default app;
