import { Request, Response } from 'express';
import PaymentLogDao from '../dao/PaymentLog';
import PaymentDao from '../dao/Payment';
// import { ITransistorSoft, ILocation } from '../interfaces/PaymentTx';
// import * as moment from 'moment-timezone'
// import RidersDao from '../dao/Riders';
// import { IDevice } from '../interfaces/Device';
// import DeviceDao from '../dao/Device';
import Cryptr from '../helpers/Crypto'
import config from '../config/config';
import * as moment from 'moment-timezone'
import { IPaymentLog } from '../interfaces/PaymentTx';

import PaymentService from '../service/PaymentService';

class Payment {
  public notify = async (req: Request, res: Response): Promise<any> => {
    try {

      if (!req.body || !req.body.partnerId || !req.body.paymentId || !req.body.paymentRequestId
        || !req.body.paymentAmount || !req.body.paymentTime || !req.body.paymentStatus) throw ReferenceError("Invalid Parameters");

      const paymentLog: PaymentLogDao = new PaymentLogDao()
      const payment: PaymentDao = new PaymentDao()

      await paymentLog.saveItem(req.body)
      await payment.updateStatus({ payment_id: req.body.paymentId }, req.body.paymentStatus)

      res.status(200).send({
        result: {
          resultCode: "SUCCESS",
          resultStatus: "S",
          resultMessage: "sucess"
        }
      })

    } catch (err) {
      const referenceError = err instanceof ReferenceError ? 400 : 500;
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        result: {
          resultCode: referenceError ? "UNKNOWN_EXCEPTION" : "PROCESS_FAIL",
          resultStatus: referenceError ? "An API calling is failed, which is caused by unknown reasons." : "A general business failure occurred. Don't retry.",
          resultMessage: err.message
        }
      });
    }
  }

  public get = async (req: Request, res: Response): Promise<any> => {
    try {

      if (!req.query || !req.query.partnerId || !req.query.paymentRequestId) throw ReferenceError("Invalid Parameters");

      const payment: PaymentDao = new PaymentDao()

      const data = await payment.getTransactions(req.body)

      res.status(200).send({
        success: true,
        data: data
      })

    } catch (err) {
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        success: false,
        message: err.message
      });
    }
  }

  public create = async (req: Request, res: Response): Promise<any> => {
    try {
      if (!req.body || !req.body.orderId || !req.body.refNo || !req.body.paymentAmount || !req.body.paymentOrderTitle) throw ReferenceError("Invalid Parameter");

      const paymentLog: PaymentLogDao = new PaymentLogDao()
      const payment: PaymentDao = new PaymentDao()

      const currentTimeStamp = `${moment().valueOf()}`
      const paymentRequestId = `${currentTimeStamp}${req.body.orderId}`
      const paymentTime = moment().format('YYYY-MM-DDTHH:mm:ss')

      const partnerId = config.REFERENCE_PARTNER_ID
      const appId = config.REFERENCE_APP_ID

      const result = await PaymentService.gcashPay({
        partnerId,
        appId,
        paymentRequestId,
        paymentOrderTitle: req.body.paymentOrderTitle,
        productCode: config.REFERENCE_PRODUCT_CODE,
        paymentAmount: req.body.paymentAmount,
        paymentFactor: {
            isCashierPayment: true
        },
        paymentReturnUrl: "",
        paymentNotifyUrl: ""
      });

      if (result) {
        const paymentLogObj: IPaymentLog = {
          partnerId: String(partnerId),
          paymentId: result.data.paymentId,
          paymentRequestId,
          paymentAmount: req.body.paymentAmount,
          paymentTime,
          paymentStatus: 'INITIATED',
          paymentFailReason: '',
        }

        await paymentLog.saveItem(paymentLogObj)
        await payment.saveItem({ ...paymentLogObj, orderId: req.body.refNo, appId: String(appId)})
      }

      res.status(200).send({
        success: true,
        result: result.data
      });
    } catch (err) {
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        success: false,
        message: `ERR CATCH: ${err.message}`
      });
    }
  }
}

export default Payment;
