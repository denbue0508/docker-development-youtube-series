export interface IPaymentTx {
    orderId: string,
    paymentId: string,
    partnerId: string,
    appId: string,
    paymentTime: string,
    paymentFailReason: string,
    paymentRequestId: string,
    paymentAmount: IPaymentAmount,
    paymentStatus: string
}

export interface IPaymentAmount { 
    currency: string,
    value: string
}

export interface IPaymentLog { 
    partnerId: string,
    paymentId: string,
    paymentRequestId: string,
    paymentAmount: IPaymentAmount,
    paymentTime: string,
    paymentStatus: string,
    paymentFailReason: string
}

export interface INotifyParams { 
    partnerId: string, 
    paymentId?: string, 
    paymentRequestId: string, 
    paymentAmount: IPaymentAmount,
    paymentStatus: string,
    paymentFailReason?: string
}
