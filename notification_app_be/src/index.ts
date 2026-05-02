import express from 'express';
import cors from 'cors';
import { config, validateConfig } from './config';
import { authMiddleware } from './middleware/authMiddleware';
import { errorMiddleware } from './middleware/errorMiddleware';
import { expressLoggingMiddleware } from '../logging_middleware';
import notificationRoutes from './routes/notificationRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(expressLoggingMiddleware());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/', authMiddleware, notificationRoutes);

app.use(errorMiddleware);

async function start(): Promise<void> {
  try {
    validateConfig();

    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

export default app;
