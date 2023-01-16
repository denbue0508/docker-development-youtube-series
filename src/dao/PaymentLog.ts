import { PaymentLog } from "../model/PaymentLog";
import { IPaymentLog } from "../interfaces/PaymentTx";
import * as moment from "moment-timezone";

class PaymentLogDao {
  constructor() {}
  public saveItem = async (params: IPaymentLog) => {
    return await new PaymentLog({
      partner_id: params.partnerId,
      payment_id: params.paymentId,
      order_id: params.orderId,
      payment_request_id: params.paymentRequestId,
      payment_amount_currency: params.paymentAmount.currency,
      payment_amount_value: params.paymentAmount.value,
      payment_time: params.paymentTime,
      status: params.paymentStatus,
      result_message: params.paymentFailReason,
      createdAt: moment().startOf("day"),
      updateAt: moment().endOf("day"),
    }).save();
  };
  public updateItem = async (filter, params: IPaymentLog) => {
    return await PaymentLog.updateOne(filter, {
      updatedAt: moment().endOf("day"),
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
