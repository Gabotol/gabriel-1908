import bodyParser from 'body-parser';
import express from 'express';
import paymentRoutes from './routes/payments.routes.ts';
import cors from 'cors'
import { systemStatus } from './middleware/systemStatus.ts';

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use('/api/payment',systemStatus, paymentRoutes);

app.get('/health',systemStatus, (req, res) => {
  res.send('Server is healthy');
});

export default app;
