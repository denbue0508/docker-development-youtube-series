import { PaymentTx } from "../model/PaymentTx";
import { IPaymentTx } from "../interfaces/PaymentTx";
import moment from "moment-timezone";

class PaymentDao {
  constructor() {}
  public updateStatus = async (filter: any, status: string) => {
    await PaymentTx.updateOne(filter, {
      updatedAt: moment(),
      payment_status: status,
    });
  };

  public getTransactions = async (params: any): Promise<any> => {
    const { userId, paymentId, partnerId } = params;

    return await PaymentTx.find({
      user_id: userId,
      payment_id: paymentId,
      partner_id: partnerId
    });
  };

  public saveItem = async (params: IPaymentTx) => {
    return await new PaymentTx({
      user_id: params.userId,
      payment_id: params.paymentId,
      refNo: params.refNo,
      client_id: params.appId,
      payment_request_id: params.paymentRequestId,
      payment_status: params.paymentStatus,
      createdAt: moment(),
      updateAt: moment(),
    }).save();
  };

  public updateItem = async (filter: any, params: IPaymentTx) => {
    return await PaymentTx.updateOne(filter, {
      updatedAt: moment(),
      payment_id: params.paymentId,
      payment_request_id: params.paymentRequestId,
      payment_status: params.paymentStatus,
    });
  };

  public countItem = async (filter: any) => {
    return await PaymentTx.countDocuments({
      createdAt: { $lt: moment(filter), $gte: moment().startOf("year") },
    });
  };

  public getTransaction = async (filter: any): Promise<any> => {
    return await PaymentTx.findOne(filter);
  };
}

export default PaymentDao;
