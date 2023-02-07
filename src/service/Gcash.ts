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

    public applyToken = async (grantCode: string) => {
        const headers = setHeader(
            process.env.GCASH_APPLY_TOKEN_URL,
            {
                referenceClientId: process.env.REFERENCE_CLIENT_ID,
                grantType: 'AUTHORIZATION_CODE',
                authCode: grantCode
            }
        )
        const res = await axios({
            method: 'POST',
            url: `${process.env.GCASH_BASE_URL}${process.env.GCASH_APPLY_TOKEN_URL}`,
            headers,
            data: {
                referenceClientId: process.env.REFERENCE_CLIENT_ID,
                grantType: 'AUTHORIZATION_CODE',
                authCode: grantCode
            }
        })
        if (res.data.result.resultStatus === 'F') {
            throw new ReferenceError(res.data.result.resultMessage)
        }

        return res
    }

    public inquiryUserInfo = async (authCode: string) => {
        const authorization = await this.applyToken(authCode)
        const token = authorization.data.accessToken
        const headers = setHeader(
            `${this.PATH}`,
            {
                accessToken: token
            }
        )
        const res = await axios({
            method: 'POST',
            url: `${this.URL}`,
            headers,
            data: {
                accessToken: token
            }
        })
        return res.data
    }
}

export default Gcash;
