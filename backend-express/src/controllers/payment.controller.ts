import {type Request, type Response} from 'express'
import { approvedCards }  from '../constants/approvedCards.ts'
import {rejectedCards} from '../constants/rejectedCards.ts'
import type { PaymentValues } from '../schemas/payment.ts';
import type { PaymentResponse } from '../interfaces/response.interface.ts';
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { PAYMENT_STATUS } from '../constants/statusPayment.ts';

export const processPayment = (req: Request<{}, {}, PaymentValues>, res: Response) => {
    const response: PaymentResponse = {
        id: uuidv4(),
        status: PAYMENT_STATUS.REJECTED,
        status_detail: '',
        transaction_amount: req.body.amount,
        date_created: new Date().toISOString(),
        authorization_code: '',
        reference: '',
        payer_id: req.body.payerId,
        payer_email: req.body.email,
        card_number: req.body.cardNumber,
        cvv: req.body.cvv
    };

    const { cardNumber, expiry, cvv } = req.body;
     

    const isApproved =  approvedCards.find(card => card.cardNumber === cardNumber && card.expiry === expiry && card.cvv === cvv);

    const rejectedCard = rejectedCards.find(card => card.cardNumber === cardNumber && card.expiry === expiry && card.cvv === cvv);

    if (isApproved) {
        response.status = PAYMENT_STATUS.APPROVED;
        response.status_detail = 'El pago fue aprobado exitosamente';
        response.authorization_code = uuidv4().slice(0, 6).toUpperCase();
        response.reference = uuidv4();
        return res.status(StatusCodes.OK).json({...response});
        
    } else if (rejectedCard) {
        response.status = PAYMENT_STATUS.REJECTED;
        response.status_detail = rejectedCard.reason;
        response.authorization_code = '';
        response.reference =uuidv4(); 

        return res.status(StatusCodes.BAD_REQUEST).json({...response});
    } else {
        response.status = PAYMENT_STATUS.REJECTED;
        response.status_detail = 'Error desconocido - contacte a soporte';
        response.authorization_code = '';
        response.reference = uuidv4();

        return res.status(StatusCodes.BAD_REQUEST).json({...response});
    }


}