import { PaymentTx } from "../model/PaymentTx";
import { IPaymentTx } from "../interfaces/PaymentTx";
import * as moment from "moment-timezone";

class PaymentDao {
  constructor() {}
  public updateStatus = async (filter, status: string) => {
    await PaymentTx.updateOne(filter, {
      updatedAt: moment(),
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
    return await new PaymentTx({
      payment_id: params.paymentId,
      refNo: params.refNo,
      client_id: params.appId,
      payment_request_id: params.paymentRequestId,
      payment_status: params.paymentStatus,
      createdAt: moment(),
      updateAt: moment(),
    }).save();
  };

  public updateItem = async (filter, params: IPaymentTx) => {
    return await PaymentTx.updateOne(filter, {
      updatedAt: moment(),
      payment_id: params.paymentId,
      payment_request_id: params.paymentRequestId,
      payment_status: params.paymentStatus,
    });
  };

  public countItem = async (filter) => {
    return await PaymentTx.countDocuments({
      createdAt: { $lt: moment(filter), $gte: moment().startOf("year") },
    });
  };
}

export default PaymentDao;
