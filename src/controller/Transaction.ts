import { Request, Response } from "express";
import TransactionDao from "../dao/Transaction";

class Transaction {
  public post = async (req: Request, res: Response): Promise<any> => {
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
