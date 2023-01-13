import GCashSvc from '../service/Gcash'

class Authorization {
    public static getUserInfo = async (authCode: string) => {
        const result = await GCashSvc.inquiryUserInfo(authCode)
        return result.data
    }
}

export default Authorization
