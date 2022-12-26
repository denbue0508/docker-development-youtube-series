export interface IPaymentTx {
    orderId: string,
    paymentId: string,
    partnerId: string,
    appId: string,
    paymentTime: string,
    paymentFailReason: string,
    paymentRequestId: string,
    paymentAmount: PaymentAmount,
    paymentStatus: string
}

interface PaymentAmount { 
    currency: string,
    value: string
}

export interface IPaymentLog { 
    partnerId: string,
    paymentId: string,
    paymentRequestId: string,
    paymentAmount: PaymentAmount,
    paymentTime: string,
    paymentStatus: string,
    paymentFailReason: string
}

export interface INotifyParams { 
    partnerId: string, 
    paymentId: string, 
    paymentRequestId: string, 
    paymentAmount: PaymentAmount,
    paymentStatus: string,
    paymentFailReason?: string
}
