import GCashSvc from '../service/Gcash'

class Authorization {
    public static applyToken = async (authCode: string) => {
        console.log('hello token')
        const result = await GCashSvc.inquiryUserInfo(authCode)
        return result.data
    }

    public static inquiryUserInfo = async (accessToken: string) => {
        console.log('hello token')
        const result = await GCashSvc.inquiryUserInfo(accessToken)
        return result.data
    }

    public static gcashPayment = async (payload: any) => {
        console.log('hello token')
        const result = await GCashSvc.payment(payload)
        return result.data
    }
}

export default Authorization
