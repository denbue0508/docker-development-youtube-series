import { Model, model, Schema } from "mongoose";
import { ITransaction } from "../interfaces/Transaction";

const TransactionSchema = Schema(
  {
    user_id: {
      type: String,
      required: true,
      trim: true,
    },
    orderDetails: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  }
);

export const Transaction: Model<ITransaction> = model<ITransaction>(
  "Transaction",
  TransactionSchema
);
