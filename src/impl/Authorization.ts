import GCashSvc from '../service/Gcash'
import * as admin from 'firebase-admin';

class Authorization {
    public static applyToken = async (authCode: string) => {
        console.log('hello token mat')
        // const tokenArr = []
        // admin.database().ref(`CLIENTS/GCASH/PARCELS_USERS`).on('value', (snapshot) => {
        //     console.log('value', snapshot.val());
        //     tokenArr.push(snapshot.val())
        // }, (errorObject) => {
        //     console.log('The read failed: ' + errorObject.name);
        // });
        // console.log('tokenArr', tokenArr);
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
