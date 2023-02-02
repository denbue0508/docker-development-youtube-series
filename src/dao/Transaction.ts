import { Transaction } from "../model/Transaction";
import { ITransaction } from "../interfaces/Transaction";
import * as moment from "moment-timezone";

class TransactionDao {
  constructor() {}

  public getTransactions = async (params: any): Promise<any> => {
    const { userId } = params;

    return await Transaction.find({
      user_id: userId
    });
  };

  public saveItem = async (params: ITransaction) => {
    console.log('saveItem: ', params)
    return await new Transaction({
      user_id: params.userId,
      orderDetails: params.orderDetails,
      status: params.status,
      createdAt: moment(),
      updateAt: moment(),
    }).save();
  };
}

export default TransactionDao;
