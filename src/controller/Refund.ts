import { Request, Response } from "express";
import config from "../config/config";
import moment from "moment-timezone";
import GcashService from "../service/Gcash";
import { updateRefundAttempt, updateRefundStatus } from "../dao/Firebase";

class Refund {
  private partnerId = config.REFERENCE_PARTNER_ID;

  public inquiry = async (req: Request, res: Response): Promise<any> => {
    try {
      if (
        !req.body ||
        !req.body.userId ||
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
        success: result.data.resultStatus === 'S',
        ...result.data
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
        !req.body.userId ||
        !req.body.paymentRequestId ||
        !req.body.paymentId ||
        !req.body.refundAmount ||
        !req.body.refundAmount.currency ||
        !req.body.refundAmount.value ||
        !req.body.refundReason
      ) throw ReferenceError("Invalid Parameter");

      const { paymentId, paymentRequestId, refundAmount, refundReason, postId } = req.body;

      const currentTimeStamp = `${moment().valueOf()}`;
      const refundRequestId = `${currentTimeStamp}${paymentRequestId}`;
      const partnerId = config.REFERENCE_PARTNER_ID;
      const Gcash: GcashService = new GcashService(config.GCASH_REFUND_URL);
      const extendInfo = {}

      const result: any = await Gcash.post({
        partnerId,
        refundRequestId,
        paymentId,
        paymentRequestId,
        refundAmount,
        refundReason,
        extendInfo
      });

      if (result.data.result.resultStatus === 'F') {
        await updateRefundAttempt(postId)
      }

      if (result.data.result.resultStatus === 'S') {
        await updateRefundStatus(postId)
      }

      res.status(200).send({
        success: result.data.resultStatus === 'S',
        ...result.data,
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
