import { PaymentTx } from "../model/PaymentTx";
import { IPaymentTx } from "../interfaces/PaymentTx";
import * as moment from "moment-timezone";

class PaymentDao {
  constructor() {}
  public updateStatus = async (filter, status: string) => {
    await PaymentTx.updateOne(filter, {
      updatedAt: moment().endOf("day"),
      payment_status: status,
    });
  };

  public getTransactions = async (params: IPaymentTx): Promise<any> => {
    const { paymentId, partnerId, paymentRequestId } = params;

    return await PaymentTx.find({
      payment_id: paymentId,
      partner_id: partnerId,
      payment_request_id: paymentRequestId,
    });
  };

  public saveItem = async (params: IPaymentTx) => {
    await new PaymentTx({
      partner_id: params.partnerId,
      payment_id: params.paymentId,
      payment_request_id: params.paymentRequestId,
      payment_amount_currency: params.paymentAmount.currency,
      payment_amount_value: String(params.paymentAmount.value),
      payment_time: params.paymentTime,
      status: params.paymentStatus,
      result_message: params.paymentFailReason,
      createdAt: moment().startOf("day"),
      updateAt: moment().endOf("day"),
    }).save();
  };
}

export default PaymentDao;
