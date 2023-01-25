export interface IPaymentTx {
  userId: string;
  partnerId: string;
  refNo: string;
  paymentId: string;
  paymentTime: string;
  paymentFailReason: string;
  paymentRequestId: string;
  paymentAmount: IPaymentAmount;
  paymentStatus: string;
  appId: string;
}

export interface IPaymentLog {
  userId: string;
  partnerId: string;
  refNo: string;
  paymentId: string;
  paymentTime: string;
  paymentFailReason: string;
  paymentRequestId: string;
  paymentAmount: IPaymentAmount;
  paymentStatus: string;
}

export interface INotifyParams {
  partnerId: string;
  paymentId?: string;
  paymentRequestId: string;
  paymentAmount: IPaymentAmount;
  paymentStatus: string;
  paymentFailReason?: string;
}

export interface IPaymentAmount {
  currency: string;
  value: string;
}
