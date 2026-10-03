// id Identificador de la operación
// status Estado general de la operación
// status_detail Detalle del resultado
// transaction_amount
// Monto solicitado
// date_created Fecha de creación de la operación
// authorization_code
// Código de autorización cuando corresponda
// reference Referencia de la operación
// payer_id Identificador del usuario
// payer_email Correo del usuario

import type { PaymentStatus } from "../constants/statusPayment.ts";

export interface PaymentResponse {
    id: string;
    status: PaymentStatus;
    status_detail: string;
    transaction_amount: number;
    date_created: string;
    authorization_code?: string;
    reference?: string;
    payer_id?: string;
    payer_email?: string;
    card_number: string;
    cvv: string
}