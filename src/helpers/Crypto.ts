export default class Cryptor {
  static cipher = (salt: string) => {
    const textToChars = (text: any) =>
      text.split('').map((c: any) => c.charCodeAt(0))
    const byteHex = (n: any) => ('0' + Number(n).toString(16)).substr(-2)
    const applySaltToChar = (code: any) =>
      textToChars(salt).reduce((a: any, b: any) => a ^ b, code)

    return (text: any) =>
      text
        .split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('')
  }

  static decipher = (salt: any) => {
    const textToChars = (text: any) =>
      text.split('').map((c: any) => c.charCodeAt(0))
    const applySaltToChar = (code: any) =>
      textToChars(salt).reduce((a: any, b: any) => a ^ b, code)
    return (encoded: any) =>
      encoded
        .match(/.{1,2}/g)
        .map((hex: any) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode: any) => String.fromCharCode(charCode))
        .join('')
  }
}
