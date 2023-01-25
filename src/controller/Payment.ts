import { Request, Response } from "express";
import PaymentLogDao from "../dao/PaymentLog";
import PaymentDao from "../dao/Payment";
import config from "../config/config";
import * as moment from "moment-timezone";
import { IPaymentLog, IPaymentTx } from "../interfaces/PaymentTx";

import GcashService from "../service/Gcash";

class Payment {
  public notify = async (req: Request, res: Response): Promise<any> => {
    try {
      if (
        !req.body ||
        !req.body.partnerId ||
        !req.body.paymentId ||
        !req.body.paymentRequestId ||
        !req.body.paymentAmount ||
        !req.body.paymentTime ||
        !req.body.paymentStatus
      )
        throw ReferenceError("Invalid Parameters");

      const paymentLog: PaymentLogDao = new PaymentLogDao();
      const payment: PaymentDao = new PaymentDao();

      await paymentLog.saveItem(req.body);
      await payment.updateStatus(
        { payment_id: req.body.paymentId },
        req.body.paymentStatus
      );

      res.status(200).send({
        result: {
          resultCode: "SUCCESS",
          resultStatus: "S",
          resultMessage: "sucess",
        },
      });
    } catch (err) {
      const referenceError = err instanceof ReferenceError ? 400 : 500;
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        result: {
          resultCode: referenceError ? "UNKNOWN_EXCEPTION" : "PROCESS_FAIL",
          resultStatus: referenceError
            ? "An API calling is failed, which is caused by unknown reasons."
            : "A general business failure occurred. Don't retry.",
          resultMessage: err.message,
        },
      });
    }
  };

  public get = async (req: Request, res: Response): Promise<any> => {
    try {
      if (!req.query || !req.query.partnerId || !req.query.paymentRequestId)
        throw ReferenceError("Invalid Parameters");

      const payment: PaymentDao = new PaymentDao();

      const data = await payment.getTransactions(req.body);

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

  public create = async (req: Request, res: Response): Promise<any> => {
    try {
      if (
        !req.body ||
        !req.body.userId ||
        !req.body.refNo ||
        !req.body.paymentAmount ||
        !req.body.paymentOrderTitle
      )
        throw ReferenceError("Invalid Parameter");

      const { userId, refNo, paymentAmount, paymentOrderTitle } = req.body;
      const reqPaymentRequestId = req.body?.paymentRequestId || "";

      const currentTimeStamp = `${moment().valueOf()}`;
      const paymentRequestId =
        reqPaymentRequestId || `${currentTimeStamp}${refNo}`;
      const paymentTime = moment().format("YYYY-MM-DDTHH:mm:ss");

      const partnerId = config.REFERENCE_PARTNER_ID;
      const appId = config.REFERENCE_APP_ID;

      const Gcash: GcashService = new GcashService(process.env.GCASH_PAYMENT_URL);
      const result = await Gcash.pay({
        partnerId,
        appId,
        paymentRequestId,
        paymentOrderTitle,
        productCode: config.REFERENCE_PRODUCT_CODE,
        paymentAmount,
        paymentFactor: {
          isCashierPayment: true,
        },
        paymentReturnUrl: "",
        paymentNotifyUrl: "",
      });

      if (result) {
        const paymentLogObj: IPaymentLog = {
          userId,
          paymentId: result.data.paymentId,
          partnerId: String(partnerId),
          paymentTime,
          paymentFailReason: "",
          paymentRequestId,
          paymentStatus: "INITIATED",
          paymentAmount: req.body.paymentAmount,
          refNo: req.body.refNo,
        };

        const paymentObj: IPaymentTx = {
          ...paymentLogObj,
          appId: String(appId),
        };

        const paymentLog: PaymentLogDao = new PaymentLogDao();
        const payment: PaymentDao = new PaymentDao();

        if (!reqPaymentRequestId) {
          await paymentLog.saveItem(paymentLogObj);
          await payment.saveItem(paymentObj);
        }
      }

      res.status(200).send({
        success: true,
        result: {
          ...result.data,
          paymentRequestId,
        },
      });
    } catch (err) {
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        success: false,
        message: `ERR CATCH: ${err.message}`,
      });
    }
  };

  public inquiry = async (req: Request, res: Response): Promise<any> => {
    try {
      if (!req.body || !req.body.paymentRequestId)
        throw ReferenceError("Invalid Parameter");

      const { paymentRequestId } = req.body;
      let result = {}

      const partnerId = config.REFERENCE_PARTNER_ID;
      const appId = config.REFERENCE_APP_ID;

      const payment: PaymentDao = new PaymentDao();
      const paymentTx = await payment.getTransaction(paymentRequestId);

      if(paymentTx) {
        if (paymentTx.payment_status === 'INITIATED') {
          const Gcash: GcashService = new GcashService(process.env.GCASH_PAYMENT_INQUIRY_URL);
          const res = await Gcash.inquiryPayment({
            partnerId,
            appId,
            paymentRequestId
          });
          result = res.data
        } else {
          result = {
            paymentStatus: paymentTx.payment_status
          }
        }
      }

      res.status(200).send({
        success: true,
        result
      });

    } catch (err) {
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        success: false,
        message: `ERR CATCH: ${err.message}`,
      });
    }
  };
}

export default Payment;
