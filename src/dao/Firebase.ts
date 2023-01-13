import * as admin from 'firebase-admin';

export const getAuthCode = async (): Promise<any> => {
    const snapshot = await admin.database().ref(`CLIENTS/GCASH/AUTH`).once('value')
    return snapshot.val()
}