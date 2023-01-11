const rs = require("jsrsasign"); //sample rsa-js library, you can use other or if you have your own rsa library
const moment = require("moment"); //moment library
export const getGcashHeader = (
  clientId: string,
  urlString: string,
  privKey: string,
  data: any
) => {
  const date = new Date();
  const currentTimestamp = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  let privateKeyStr = privKey;

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
    "Client-Id": clientId, // 2022091611342100029162
    "Request-Time": currentTimestamp,
    Signature: "algorithm=RSA256, keyVersion=0, signature=" + encodedSignature,
  };

  return headerData;
};
