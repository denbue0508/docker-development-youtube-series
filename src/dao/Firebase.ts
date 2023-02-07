import * as admin from 'firebase-admin';

export const getAuthCode = async (): Promise<any> => {
    const snapshot = await admin.database().ref(`CLIENTS/GCASH/AUTH`).once('value')
    return snapshot.val()
}

export const updateRefundAttempt = async (id: string): Promise<any> => {
    return admin.firestore().collection(`GCASH/POST/PENDING`).doc(id).update({ 'gcash.refund.attempt': admin.firestore.FieldValue.increment(1), 'gcash.refund.success': false })
}

export const updateRefundStatus = async (id: string): Promise<any> => {
    return admin.firestore().collection(`GCASH/POST/PENDING`).doc(id).update({ 'gcash.refund.success': true })
}