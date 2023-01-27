import { Request, Response } from "express";
import PaymentLogDao from "../dao/PaymentLog";
import TransactionDao from "../dao/Transaction";
import config from "../config/config";
import * as moment from "moment-timezone";
import { IPaymentLog, IPaymentTx } from "../interfaces/PaymentTx";

import GcashService from "../service/Gcash";

class Transaction {
  public post = async (req: Request, res: Response): Promise<any> => {
    console.log('post: ', req.body)
    try {
      if (!req.body || !req.body.userId || !req.body.orderDetails || !req.body.status)
        throw ReferenceError("Invalid Parameters");

      const { userId, orderDetails, status } = req.body;
      const transaction: TransactionDao = new TransactionDao();

      const data = await transaction.saveItem({ userId, orderDetails, status});

      res.status(200).send({
        success: true,
        data: data,
      });
    } catch (err) {
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        success: false,
        message: err.message,
      });
    }
  };
  public get = async (req: Request, res: Response): Promise<any> => {
    console.log('get: ', req.query)
    try {
      if (!req.query || !req.query.userId)
        throw ReferenceError("Invalid Parameters");

      const { userId } = req.query;
      const transaction: TransactionDao = new TransactionDao();

      const data = await transaction.getTransactions({ userId });

      res.status(200).send({
        success: true,
        data: data,
      });
    } catch (err) {
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        success: false,
        message: err.message,
      });
    }
  };
}

export default Transaction;
