import { getGcashHeader } from "../helpers/setPaymentHeaders";
import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";

class PaymentService {
  public static gcashPay = async (payload: any) => {
    const headers = getGcashHeader(
      process.env.REFERENCE_CLIENT_ID,
      `${process.env.GCASH_PAYMENT_URL}`,
      process.env.GCASH_PRIVATE_KEY,
      payload
    );

    return axios({
      method: "POST",
      url: `${process.env.GCASH_BASE_URL}${process.env.GCASH_PAYMENT_URL}`,
      headers,
      data: payload,
    });
  };
}

export default PaymentService;
