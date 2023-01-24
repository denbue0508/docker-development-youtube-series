import { Request, Response } from "express";
import config from "../config/config";
import * as moment from "moment-timezone";
import GcashService from "../service/Gcash";

class Refund {
  private partnerId = config.REFERENCE_PARTNER_ID;

  public inquiry = async (req: Request, res: Response): Promise<any> => {
    try {
      if (
        !req.body ||
        !req.body.refundId ||
        !req.body.refundRequestId
      )
        throw ReferenceError("Invalid Parameter");

      const { refundId, refundRequestId } = req.body;

      const Gcash: GcashService = new GcashService(config.GCASH_INQUIRY_REFUND);
      const partnerId = config.REFERENCE_PARTNER_ID;

      const result = await Gcash.post({
        partnerId,
        refundId,
        refundRequestId
      });

      res.status(200).send({
        success: true,
        result: result.data
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
      // validate parameter
      if (
        !req.body ||
        !req.body.paymentRequestId ||
        !req.body.paymentId ||
        !req.body.refundAmount ||
        !req.body.refundAmount.currency ||
        !req.body.refundAmount.value ||
        !req.body.refundReason
      ) throw ReferenceError("Invalid Parameter");

      const { paymentId, paymentRequestId, refundAmount, refundReason } = req.body;

      const currentTimeStamp = `${moment().valueOf()}`;
      const refundRequestId = `${currentTimeStamp}${paymentRequestId}`;
      const partnerId = config.REFERENCE_PARTNER_ID;
      const Gcash: GcashService = new GcashService(config.GCASH_REFUND_URL);
      const extendInfo = {}

      const result = await Gcash.post({
        partnerId,
        refundRequestId,
        paymentId,
        paymentRequestId,
        refundAmount,
        refundReason,
        extendInfo
      });

      res.status(200).send({
        success: true,
        result: result.data,
      });
    } catch (err) {
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        success: false,
        message: `ERR CATCH: ${err.message}`,
      });
    }
  };
}

export default Refund;
