import * as admin from 'firebase-admin'

class RidersDao {
    constructor(client: string) {

    }

    public static updateRiderLocation = (params) => {
        const path = `CLIENTS/${params.clientId}/RIDERS/${params.riderId}`;

        return admin.database().ref(`${path}`).update({
            latitude: params.latitude,
            longitude: params.longitude,
            lastTimeStamp: params.lastTimeStamp
        })
    }
}

export default RidersDao
