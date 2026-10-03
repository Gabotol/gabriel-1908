import { type Request, type Response, type NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PAYMENT_STATUS } from '../constants/statusPayment.ts';

export function systemStatus(req: Request, res: Response, next: NextFunction) {
  if (process.env.TURN_OFF_SISTEM === 'true') {
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
      status: PAYMENT_STATUS.ERROR,
      status_detail: 'el servicio de pagos presenta un problema interno y no puede procesar solicitudes',
    });
  }
  next();
}
