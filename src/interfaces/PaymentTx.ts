export interface IPaymentTx {
    partnerId: string,
    orderId: string,
    paymentId: string,
    paymentTime: string,
    paymentFailReason: string,
    paymentRequestId: string,
    paymentAmount: IPaymentAmount,
    paymentStatus: string,
    appId: string
}

export interface IPaymentAmount { 
    currency: string,
    value: string
}

export interface IPaymentLog { 
    partnerId: string,
    orderId?: string,
    paymentId: string,
    paymentTime: string,
    paymentFailReason: string,
    paymentRequestId: string,
    paymentAmount: IPaymentAmount,
    paymentStatus: string,
}

export interface INotifyParams { 
    partnerId: string, 
    paymentId?: string, 
    paymentRequestId: string, 
    paymentAmount: IPaymentAmount,
    paymentStatus: string,
    paymentFailReason?: string
}
