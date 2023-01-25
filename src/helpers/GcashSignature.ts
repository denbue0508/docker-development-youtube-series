const rs = require("jsrsasign"); //sample rsa-js library, you can use other or if you have your own rsa library
const moment = require("moment"); //moment library

import * as dotenv from "dotenv";
dotenv.config();

export const setHeader = (
  urlString: string,
  data: any
) => {
  const date = new Date();
  const currentTimestamp = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  let privateKeyStr = process.env.GCASH_PRIVATE_KEY;
  let clientId = process.env.REFERENCE_CLIENT_ID;

  const dataToSign =
    "POST " +
    urlString +
    "\n" +
    clientId +
    "." +
    currentTimestamp +
    "." +
    JSON.stringify(data);

  if (!privateKeyStr.startsWith("-----BEGIN PRIVATE KEY-----")) {
    privateKeyStr =
      "-----BEGIN PRIVATE KEY-----\n" +
      privateKeyStr +
      "\n-----END PRIVATE KEY-----";
  }

  // set RSA privateKey
  const rsaPrivateKey = rs.KEYUTIL.getKey(privateKeyStr, "passwd");

  // initialize
  const sig = new rs.KJUR.crypto.Signature({ alg: "SHA256withRSA" });

  // initialize for signature generation
  sig.init(rsaPrivateKey);
  sig.updateString(dataToSign);

  // calculate signature
  const sigValueHex = sig.sign();

  const hex2b64Signature = rs.hex2b64(sigValueHex);
  const encodedSignature = encodeURIComponent(hex2b64Signature);

  const headerData = {
    "content-type": "application/json; charset=UTF-8",
    "Client-Id": clientId,
    "Request-Time": currentTimestamp,
    Signature: "algorithm=RSA256, keyVersion=0, signature=" + encodedSignature,
  };

  return headerData;
};
