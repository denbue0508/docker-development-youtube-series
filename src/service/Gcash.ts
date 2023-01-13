import { getSignature } from '../helpers/gcash'
import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios'

class Gcash {
    public static applyToken = async (grantCode: string) => {
        const headers = getSignature(
            process.env.REFERENCE_CLIENT_ID,
            `/v1/authorizations/applyToken.htm`,
            `${process.env.GCASH_PRIVATE_KEY}`,
            {
                referenceClientId: process.env.REFERENCE_CLIENT_ID,
                grantType: 'AUTHORIZATION_CODE',
                authCode: grantCode
            }
        )
        const res = await axios({
            method: 'POST',
            url: `${process.env.GCASH_BASE_URL}/v1/authorizations/applyToken.htm`,
            headers,
            data: {
                referenceClientId: process.env.REFERENCE_CLIENT_ID,
                grantType: 'AUTHORIZATION_CODE',
                authCode: grantCode
            }
        })
        if (res.data.result.resultStatus === 'F') {
            console.log(res.data.result)
            throw new ReferenceError(res.data.result.resultMessage)
        }
        console.log(res.data.result)
        return res
    }

    public static inquiryUserInfo = async (authCode: string) => {
        const authorization = await this.applyToken(authCode)
        const token = authorization.data.accessToken
        const headers = getSignature(
            process.env.REFERENCE_CLIENT_ID,
            '/v1/customers/user/inquiryUserInfoByAccessToken.htm',
            `${process.env.GCASH_PRIVATE_KEY}`,
            {
                accessToken: token
            }
        )
        return axios({
            method: 'POST',
            url: `${process.env.GCASH_BASE_URL}/v1/customers/user/inquiryUserInfoByAccessToken.htm`,
            headers,
            data: {
                accessToken: token
            }
        })
    }
}

export default Gcash
