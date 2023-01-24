import { Model, model, Schema } from "mongoose";
import { IPaymentTx } from "../interfaces/PaymentTx";

const PaymentTxSchema = Schema(
  {
    payment_id: {
      type: String,
      required: true,
      trim: true,
    },
    refNo: {
      type: String,
      required: true,
      trim: true,
    },
    client_id: {
      type: String,
      required: true,
    },
    payment_request_id: {
      type: String,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  }
);

export const PaymentTx: Model<IPaymentTx> = model<IPaymentTx>(
  "PaymentTx",
  PaymentTxSchema
);
