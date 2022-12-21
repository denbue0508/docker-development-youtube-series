import { Request, Response } from 'express';
import GCashSvc from '../service/Gcash';

class Authorization {
    public async applyToken(req: Request, res: Response): Promise<void> {
        // try {
        const { authCode } = req.body;
        const result = await GCashSvc.inquiryUserInfo(authCode);
        res.status(200);
        res.json({
            success: true,
            result
        });
        // } catch (error) {
        //     const message = error?.response?.data?.message || error.message;
        //     console.log('GCash Authorization Failed', {
        //         message,
        //         err: error?.response?.data || error
        //     });
        //     res.status(400).json({
        //         sucess: false,
        //         message
        //     });
        // }
    }

    // private sortHeatmaps(obj) {
    //   const jobIds = new Set<string>();
    //   obj.location.forEach(item => item.extras && item.extras.job_ids.length > 0 && item.extras.job_ids.forEach(id => jobIds.add(id)));
    //   const heatMaps = new Array<ITransistorSoft>();

    //   jobIds.forEach(jobId => {
    //     heatMaps.push({
    //       job_id: jobId,
    //       rider_id: obj.rider_id,
    //       client_id: obj.client_id,
    //       hub_id: obj.hub_id,
    //       location: obj.location.filter(location => location.extras.job_ids.indexOf(jobId) > -1),
    //       lasttimestamp: null
    //     })
    //   });

    //   const jobIdsInOtherHubs = new Array<any>();
    //   // handle Other job ids
    //   obj.location.forEach((item: ILocation )=> {

    //     if(item.extras && item.extras.otherJobIds) {
    //       const otherJobIds = item.extras.otherJobIds
    //       for (const hubId in otherJobIds) {
    //         const jobIdsInHub = otherJobIds[hubId] || []

    //         jobIdsInHub.forEach(jobId => {
    //           if(!jobIdsInOtherHubs.includes(jobId)) {
    //             heatMaps.push({
    //               job_id: jobId,
    //               rider_id: obj.rider_id,
    //               client_id: obj.client_id,
    //               hub_id: hubId,
    //               location: [item],
    //               lasttimestamp: null
    //             })
    //             jobIdsInOtherHubs.push(jobId)
    //           }
    //         })
    //       }
    //     }
    //   });

    //   return heatMaps;
    // }

    // private logDeviceHealth = (info, locations) => {
    //   const listOfDeviceLogs: Array<IDevice> = new Array<IDevice>();

    //   locations.forEach((location: ILocation) => {
    //     let log: IDevice = {
    //       job_ids: location.extras.job_ids,
    //       client_id: info.client_id,
    //       hub_id: info.hub_id,
    //       rider_id: info.rider_id,
    //       location_provider: location.extras.locationProvider,
    //       power_state: location.extras.powerState,
    //       app_version: location.extras.appVersion,
    //       api_level: location.extras.apiLevel,
    //       connection_type: location.extras.connectionType,
    //       android_version: location.extras.androidVersion,
    //       device_name: location.extras.deviceName,
    //       free_storage: location.extras.freeStorage,
    //       max_memory: location.extras.maxMemory,
    //       transaction_date: moment(location.timestamp).toDate()
    //     }

    //     listOfDeviceLogs.push(log);
    //   })

    //   DeviceDao.saveItems(listOfDeviceLogs);
    // }

    // /**
    //  * This will update the current location of the rider
    //  * in parallel of saving heatmap
    //  */
    // private updateRiderCurrentLocation = (rider) => {
    //   const lastIndex = rider.location.length - 1;

    //   RidersDao.updateRiderLocation({
    //     clientId: rider.client_id,
    //     riderId: rider.rider_id,
    //     ...rider.location[lastIndex].coords,
    //     lastTimeStamp: moment().valueOf()
    //   })
    // }

    // public get = async (req: Request, res: Response): Promise<any> => {
    //   try {

    //     if ((!req.query.from && !req.query.to)
    //       || !req.query.riderId || !req.query.clientId
    //       || !req.query.hubId
    //       || (!moment(req.query.from, 'MM-DD-YYYY').isValid()
    //         || !moment(req.query.to, 'MM-DD-YYYY').isValid())) throw ReferenceError("Invalid Parameter");

    //     const matrix: heatmapDao = new heatmapDao();
    //     const data = await matrix.getHeatmap({
    //       ...req.query
    //     });

    //     res.status(200).send({
    //       success: true,
    //       data
    //     });
    //   } catch (err) {
    //     res.status(err instanceof ReferenceError ? 400 : 500).send({
    //       success: false,
    //       message: err.message
    //     });
    //   }
    // }
}

export default Authorization;
