import { Model, model, Schema } from "mongoose";
import { IPaymentTx } from "../interfaces/PaymentTx";

const PaymentTxSchema = Schema(
  {
    payment_id: {
      type: String,
      trim: true
    },
    order_id: {
      type: String,
      required: true,
      trim: true
    },
    client_id: {
      type: String,
      required: true
    },
    payment_request_id: {
      type: String,
      required: true
    },
    payment_status: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export const PaymentTx: Model<IPaymentTx> = model<IPaymentTx>("PaymentTx", PaymentTxSchema);

"ERR CATCH: PaymentTx validation failed: payment_status: Path `payment_status` is required., client_id: Path `client_id` is required., order_id: Path `order_id` is required., payment_id: Path `payment_id` is required."

