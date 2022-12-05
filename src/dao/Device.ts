import * as admin from 'firebase-admin'
import { IDevice } from '../interfaces/Device'
import { Device } from '../model/Device';
import * as moment from 'moment-timezone';

class DeviceDao {
    constructor() {

    }

    public get = async (params) => {
        const limit = Number(params.limit) || 50;
        const skip = params.page ? (params.page -1) * limit : 0;

        return await Device.find({
            client_id: params.clientId,
            rider_id: params.riderId
        }, {}, { skip, limit }).sort({createdAt: 'desc'})
    }

    public getPagination = async (params) => {
        const limit = Number(params.limit) || 50;
        const total = await Device.countDocuments({
            client_id: params.clientId,
            rider_id: params.riderId
        });

        let totalPages = Math.ceil(total / limit);

        return {
            total,
            totalPages
        }
    }

    public static saveItems = async (deviceLogs: Array<IDevice>) => {
        return await Device.insertMany(deviceLogs);
    }
}

export default DeviceDao
