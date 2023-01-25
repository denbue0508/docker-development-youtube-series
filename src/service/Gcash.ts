import { setHeader } from "../helpers/GcashSignature";
import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";
class Gcash {
  private PATH: string;
  private URL: string;

  constructor(path: string) {
    this.PATH = path;
    this.URL = `${process.env.GCASH_BASE_URL}${this.PATH}`
  }

  public post = async (payload: any) => {
    const headers = setHeader(
      `${this.PATH}`,
      payload
    );

    return axios({
      method: "POST",
      url: `${this.URL}`,
      headers,
      data: payload,
    });
  };
}

export default Gcash;
