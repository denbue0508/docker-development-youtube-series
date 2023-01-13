const rs = require('jsrsasign'); //sample rsa-js library, you can use other or if you have your own rsa library
const moment = require('moment'); //moment library

export const getSignature = (
    clientId: string,
    urlString: string,
    privateKeyStr: string,
    postData: any
) => {
    const date = new Date()
    const currentTimestamp = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    const dataToSign =
        'POST ' + urlString + '\n' + clientId + '.' + currentTimestamp + '.' + JSON.stringify(postData)
    console.log('Data to sign: ' + dataToSign)

    if (!privateKeyStr.startsWith('-----BEGIN PRIVATE KEY-----')) {
        privateKeyStr = '-----BEGIN PRIVATE KEY-----\n' + privateKeyStr + '\n-----END PRIVATE KEY-----'
    }

    // set RSA privateKey
    const rsaPrivateKey = rs.KEYUTIL.getKey(privateKeyStr, 'passwd')

    // initialize
    const sig = new rs.KJUR.crypto.Signature({ alg: 'SHA256withRSA' })

    // initialize for signature generation
    sig.init(rsaPrivateKey)
    sig.updateString(dataToSign)

    // calculate signature
    const sigValueHex = sig.sign()
    console.log('sigValueHex: ' + sigValueHex)

    const hex2b64Signature = rs.hex2b64(sigValueHex)
    console.log('hex2b64Signature: ' + hex2b64Signature)

    const encodedSignature = encodeURIComponent(hex2b64Signature)
    console.log('encodedSignature: ' + encodedSignature)

    const headerData = {
        'content-type': 'application/json; charset=UTF-8',
        'Client-Id': clientId, //2022091611342100029162
        'Request-Time': currentTimestamp,
        Signature: 'algorithm=RSA256, keyVersion=1, signature=' + encodedSignature
    }

    return headerData
}
