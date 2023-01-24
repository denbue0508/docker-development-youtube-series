import { set } from "../helpers/GCashHeaders";
import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";
class Gcash {
  private CLIENT_ID: string;
  private PRIVATE_KEY: string;
  private BASE_URL: string;
  public PATH: string;

  constructor(path: string) {
    this.CLIENT_ID = process.env.REFERENCE_CLIENT_ID;
    this.PRIVATE_KEY = process.env.GCASH_PRIVATE_KEY;
    this.BASE_URL = process.env.GCASH_BASE_URL;
    this.PATH = path;
  }

  public pay = async (payload: any) => {
    const headers = set(
      this.CLIENT_ID,
      `${process.env.GCASH_PAYMENT_URL}`,
      this.PRIVATE_KEY,
      payload
    );

    return axios({
      method: "POST",
      url: `${this.BASE_URL}${process.env.GCASH_PAYMENT_URL}`,
      headers,
      data: payload,
    });
  };

  public inquiry = async (payload: any) => {
    const headers = set(
      this.CLIENT_ID,
      `${process.env.GCASH_PAYMENT_INQUIRY_URL}`,
      this.PRIVATE_KEY,
      payload
    );

    return axios({
      method: "POST",
      url: `${this.BASE_URL}${process.env.GCASH_PAYMENT_INQUIRY_URL}`,
      headers,
      data: payload,
    });
  };
}

export default Gcash;
