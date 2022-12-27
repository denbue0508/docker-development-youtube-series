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
}

export default Authorization
