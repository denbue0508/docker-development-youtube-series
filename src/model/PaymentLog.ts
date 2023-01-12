import { Model, model, Schema } from "mongoose";
import { IPaymentLog } from "../interfaces/PaymentTx";

const PaymentLogSchema = Schema(
  {
    partner_id: {
      type: String,
      required: true
    },
    payment_id: {
      type: String,
      required: false
    },
    payment_request_id: {
      type: String,
      required: true
    },
    payment_amount_currency: {
      type: String,
      required: true
    },
    payment_amount_value: {
      type: String,
      required: true
    },
    payment_time: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    result_message: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export const PaymentLog: Model<IPaymentLog> = model<IPaymentLog>("PaymentLog", PaymentLogSchema);

