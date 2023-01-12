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
      payment_id: params.paymentId,
      order_id: params.orderId,
      client_id: params.appId,
      payment_request_id: params.paymentRequestId,
      payment_status: params.paymentStatus,
      createdAt: moment().startOf("day"),
      updateAt: moment().endOf("day"),
    }).save();
  };
}

export default PaymentDao;