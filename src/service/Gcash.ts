import { getGcashHeader, getGcashInquiryHeader } from '../helpers/setHeaders'

import axios from 'axios'

class Gcash {
    public static async getAuthorization(grantCode: string) {
        const headers = getGcashHeader(
            '2022112511150000031704',
            '/v1/authorizations/applyToken.htm',
            `-----BEGIN PRIVATE KEY-----
      MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCcePfyP047Fdcj
      7QuaCo4e5uVjlJktDUIoMLsvIu/qGF3SwZUcy5a+Glgl/t7LFDj9UpdXUxx5R6P3
      mwcd7xsSBmRCfza/rIkIYriSA2xcHSOfRvQwUlrIU1MMXR2PIUU8tCIgw+6Ngk39
      7E8d6ttK0clUMOGI9zcXlE22AyNlRZWeJeEko0Vz2CEZsdTU1X0mNXyudD8ly+qN
      N4aV0aOd2Qf47GkpdkP7BgRIXMKcxhsLNLPBpZNab74OW1onoNlXVU6e0wLGYO1h
      +Zx4QKPcRRCjKcuunCc1hkzeuAADTb1jnQjWVzGNpEnJfil2mZlMUT+lHmpBUaFA
      B6KjYC6DAgMBAAECggEAC4V2VezTYp/5EQW84cEyApR9z32uY0k9CQVaXKr15dOY
      rpJ423+IjSoWoE8wy6mku88yomHV3Ut17bii8+rnOcYlG8Bb1HRsoqSiP1FOAuC7
      /r5hIvqHAYXt8SGDshMarGpj5bjt/jCm2kuY7ifQF3JBbZf4nPbKPhigoDmBVOa6
      CyEYEiYQDXT4UvytVndGF2j/gOOQ3Jo1HoRDkZZCYUkyue6hI2KRaHuQqrfbj68m
      btVYoe4JxYGjSWIXvadi0FV94lrZIZtc1ezq4Qng0AeNMpzOAqastByvQOYbf13r
      7JZuMx7zuufTbgOUA/cfBnk7WNmv1I1HP8BmD3h0AQKBgQDT4x1TQapcZdYCaaSO
      4D4qPULxTWJL0elw7PsrqZEmmtv0jSlhszfR3jjTXr1hVEdRMHEpO9vHUC9h0wY9
      0Wb0GJgCg4v4//Ml6wiXf1f9DHDfMnNoODAlKrqnW3Q0wwMKKhurAhEoL06tb/ji
      HOvq0wdxcZkVBC6LcKRSV+5JKQKBgQC9DG/wWIvOjhTTkhQL5m0Q8VBlKuxXI2y9
      PMRkoN2lhhvt6Etwb++XjYOJ36npXwO6AQOngVwwhTt64heY9H1vh84yvEHYZJPj
      aCoEO19i5BiVkctn575gXdHrPjojk3wCy2AHw0de6h0rJgz65aZkleEizTotcDgE
      0mCg8DEzywKBgE6HUNoHbz05XNyeDKgLQd7jv4iw9mpFTPBWVCx1dt9I65YyLxEP
      m/ODGap05VlKI/haLMZsceLnu/fUfu6wSijTaJsd5+WL7rCx8Ag94P1e/AIsr4sD
      sAxGTtEx2tqnH9xHiOOTK4qqJc2vvx0GPQVV2t9Xi7W3TAzP3YbLIfwpAoGAYvBu
      aTA+QyUS+0NZYH0BGbvhooDbXiN5FnUGJ9AVEDrmxRUs3jSHBR8X94FqEGwcrC05
      t2G5WN9xqLdJOFDEkSlXHjBumYzR5VMvojVcj4nm3+iEtuWPOin/4gkYLmRSo7fC
      k219HcyS5XEtm+WytrPGNwuHZh50AvoDflcWuQ8CgYBJwRfLXi139c9Dd46M3xxz
      RwqUbExRoEQcMhwsBWlSB/X/lfO1cs50zvfRJZHLwc1u56ufsMCA4TRyAMmWhxZd
      Sa6JPenTcp+P/SkspX+WDxvdOnxkvLCw1ZDvBLy/MnAUVm7uafJMPKsk09rwFYvX
      aZ0BUdwm0aldymX0PbVyQw==
      -----END PRIVATE KEY-----`,
            grantCode
        )
        return axios({
            method: 'POST',
            url: `https://api-sit.saas.mynt.xyz/v1/authorizations/applyToken.htm`,
            headers,
            data: {
                referenceClientId: '2022112511150000031704',
                grantType: 'AUTHORIZATION_CODE',
                authCode: grantCode
            }
        })
    }

    public static inquiryUserInfo = async (authCode: string) => {
        const authorization = await Gcash.getAuthorization(authCode)
        console.log('authorization dao', authorization.data)
        const token = authorization.data.accessToken
        console.log('dao token', token)
        const headers = getGcashInquiryHeader(
            '2022112511150000031704',
            '/v1/customers/user/inquiryUserInfoByAccessToken.htm',
            `-----BEGIN PRIVATE KEY-----
      MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCcePfyP047Fdcj
      7QuaCo4e5uVjlJktDUIoMLsvIu/qGF3SwZUcy5a+Glgl/t7LFDj9UpdXUxx5R6P3
      mwcd7xsSBmRCfza/rIkIYriSA2xcHSOfRvQwUlrIU1MMXR2PIUU8tCIgw+6Ngk39
      7E8d6ttK0clUMOGI9zcXlE22AyNlRZWeJeEko0Vz2CEZsdTU1X0mNXyudD8ly+qN
      N4aV0aOd2Qf47GkpdkP7BgRIXMKcxhsLNLPBpZNab74OW1onoNlXVU6e0wLGYO1h
      +Zx4QKPcRRCjKcuunCc1hkzeuAADTb1jnQjWVzGNpEnJfil2mZlMUT+lHmpBUaFA
      B6KjYC6DAgMBAAECggEAC4V2VezTYp/5EQW84cEyApR9z32uY0k9CQVaXKr15dOY
      rpJ423+IjSoWoE8wy6mku88yomHV3Ut17bii8+rnOcYlG8Bb1HRsoqSiP1FOAuC7
      /r5hIvqHAYXt8SGDshMarGpj5bjt/jCm2kuY7ifQF3JBbZf4nPbKPhigoDmBVOa6
      CyEYEiYQDXT4UvytVndGF2j/gOOQ3Jo1HoRDkZZCYUkyue6hI2KRaHuQqrfbj68m
      btVYoe4JxYGjSWIXvadi0FV94lrZIZtc1ezq4Qng0AeNMpzOAqastByvQOYbf13r
      7JZuMx7zuufTbgOUA/cfBnk7WNmv1I1HP8BmD3h0AQKBgQDT4x1TQapcZdYCaaSO
      4D4qPULxTWJL0elw7PsrqZEmmtv0jSlhszfR3jjTXr1hVEdRMHEpO9vHUC9h0wY9
      0Wb0GJgCg4v4//Ml6wiXf1f9DHDfMnNoODAlKrqnW3Q0wwMKKhurAhEoL06tb/ji
      HOvq0wdxcZkVBC6LcKRSV+5JKQKBgQC9DG/wWIvOjhTTkhQL5m0Q8VBlKuxXI2y9
      PMRkoN2lhhvt6Etwb++XjYOJ36npXwO6AQOngVwwhTt64heY9H1vh84yvEHYZJPj
      aCoEO19i5BiVkctn575gXdHrPjojk3wCy2AHw0de6h0rJgz65aZkleEizTotcDgE
      0mCg8DEzywKBgE6HUNoHbz05XNyeDKgLQd7jv4iw9mpFTPBWVCx1dt9I65YyLxEP
      m/ODGap05VlKI/haLMZsceLnu/fUfu6wSijTaJsd5+WL7rCx8Ag94P1e/AIsr4sD
      sAxGTtEx2tqnH9xHiOOTK4qqJc2vvx0GPQVV2t9Xi7W3TAzP3YbLIfwpAoGAYvBu
      aTA+QyUS+0NZYH0BGbvhooDbXiN5FnUGJ9AVEDrmxRUs3jSHBR8X94FqEGwcrC05
      t2G5WN9xqLdJOFDEkSlXHjBumYzR5VMvojVcj4nm3+iEtuWPOin/4gkYLmRSo7fC
      k219HcyS5XEtm+WytrPGNwuHZh50AvoDflcWuQ8CgYBJwRfLXi139c9Dd46M3xxz
      RwqUbExRoEQcMhwsBWlSB/X/lfO1cs50zvfRJZHLwc1u56ufsMCA4TRyAMmWhxZd
      Sa6JPenTcp+P/SkspX+WDxvdOnxkvLCw1ZDvBLy/MnAUVm7uafJMPKsk09rwFYvX
      aZ0BUdwm0aldymX0PbVyQw==
      -----END PRIVATE KEY-----`,
            token
        )
        return axios({
            method: 'POST',
            url: `https://api-sit.saas.mynt.xyz/v1/customers/user/inquiryUserInfoByAccessToken.htm`,
            headers,
            data: {
                accessToken: token
            }
        })
    }
}

export default Gcash
