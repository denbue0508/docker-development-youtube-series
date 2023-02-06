import { PaymentLog } from "../model/PaymentLog";
import { IPaymentLog } from "../interfaces/PaymentTx";
import moment from "moment-timezone";

class PaymentLogDao {
  constructor() {}
  public saveItem = async (params: IPaymentLog) => {
    let payLog = {
      user_id: params.userId,
      partner_id: params.partnerId,
      payment_id: params.paymentId,
      payment_request_id: params.paymentRequestId,
      payment_amount_currency: params.paymentAmount.currency,
      payment_amount_value: params.paymentAmount.value,
      payment_time: params.paymentTime,
      status: params.paymentStatus,
      result_message: params.paymentFailReason,
      createdAt: moment(),
      updateAt: moment(),
    }

    if (params?.refNo) {
      return await new PaymentLog({...payLog, refNo: params.refNo}).save();
    }
    return await new PaymentLog(payLog).save();
  };
  public updateItem = async (filter, params: IPaymentLog) => {
    return await PaymentLog.updateOne(filter, {
      updatedAt: moment(),
      payment_id: params.paymentId,
      payment_request_id: params.paymentRequestId,
      payment_amount_currency: params.paymentAmount.currency,
      payment_amount_value: params.paymentAmount.value,
      payment_time: params.paymentTime,
      status: params.paymentStatus,
      result_message: params.paymentFailReason,
    });
  };
}

export default PaymentLogDao;
