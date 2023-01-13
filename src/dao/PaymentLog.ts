import { PaymentLog } from "../model/PaymentLog";
import { IPaymentLog } from "../interfaces/PaymentTx";
import * as moment from "moment-timezone";

class PaymentLogDao {
  constructor() {}
  public saveItem = async (params: IPaymentLog) => {
    await new PaymentLog({
      partner_id: params.partnerId,
      payment_id: params.paymentId,
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
}

export default PaymentLogDao;