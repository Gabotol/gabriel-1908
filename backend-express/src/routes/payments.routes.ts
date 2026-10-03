import express from 'express';
import { validateData } from '../middleware/validation.ts';
import { paymentSchema } from '../schemas/payment.ts';
import { processPayment } from '../controllers/payment.controller.ts';

const router = express.Router();

router.post('/', validateData(paymentSchema), processPayment);

export default router;