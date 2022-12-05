import { Request, Response } from 'express';
import DeviceDao from '../dao/Device';

class Device {
    public get = async (req: Request, res: Response): Promise<any> => {
        try {
            if ((!req.query.clientId && !req.query.riderId)) throw ReferenceError("Invalid Parameter");

            const device: DeviceDao = new DeviceDao();
            const pagination = await device.getPagination({...req.query})

            if(pagination.totalPages < req.query.page) throw ReferenceError("Invalid page no.")

            const data = await device.get({
                ...req.query
            });

            res.status(200).send({
                success: true,
                data,
                ...pagination,
                currentPage: req.query.page || 1,
                showing: data.length
            });

        } catch (err) {
            res.status(err instanceof ReferenceError ? 400 : 500).send({
                success: false,
                message: err.message
            });
        }
    }
}

export default Device;