import * as admin from 'firebase-admin';

export const getAuthCode = async (): Promise<any> => {
    const snapshot = await admin.database().ref(`CLIENTS/GCASH/AUTH`).once('value')
    console.log('value', snapshot.val())
    return snapshot.val()
}