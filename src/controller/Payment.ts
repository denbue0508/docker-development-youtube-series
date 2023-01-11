import { Request, Response } from 'express';
import PaymentLogDao from '../dao/PaymentLog';
import PaymentDao from '../dao/Payment';
// import { ITransistorSoft, ILocation } from '../interfaces/PaymentTx';
// import * as moment from 'moment-timezone'
// import RidersDao from '../dao/Riders';
// import { IDevice } from '../interfaces/Device';
// import DeviceDao from '../dao/Device';
import Cryptr from '../helpers/Crypto'
import config from '../config/config';
import * as moment from 'moment-timezone'
import { IPaymentLog } from '../interfaces/PaymentTx';

import PaymentService from '../service/PaymentService';

class Payment {
  public notify = async (req: Request, res: Response): Promise<any> => {
    try {

      if (!req.body || !req.body.partnerId || !req.body.paymentId || !req.body.paymentRequestId
        || !req.body.paymentAmount || !req.body.paymentTime || !req.body.paymentStatus) throw ReferenceError("Invalid Parameters");

      const paymentLog: PaymentLogDao = new PaymentLogDao()
      const payment: PaymentDao = new PaymentDao()

      await paymentLog.saveItem(req.body)
      await payment.updateStatus({ payment_id: req.body.paymentId }, req.body.paymentStatus)

      res.status(200).send({
        result: {
          resultCode: "SUCCESS",
          resultStatus: "S",
          resultMessage: "sucess"
        }
      })

    } catch (err) {
      const referenceError = err instanceof ReferenceError ? 400 : 500;
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        result: {
          resultCode: referenceError ? "UNKNOWN_EXCEPTION" : "PROCESS_FAIL",
          resultStatus: referenceError ? "An API calling is failed, which is caused by unknown reasons." : "A general business failure occurred. Don't retry.",
          resultMessage: err.message
        }
      });
    }
  }

  public get = async (req: Request, res: Response): Promise<any> => {
    try {

      if (!req.query || !req.query.partnerId || !req.query.paymentRequestId) throw ReferenceError("Invalid Parameters");

      const payment: PaymentDao = new PaymentDao()

      const data = await payment.getTransactions(req.body)

      res.status(200).send({
        success: true,
        data: data
      })

    } catch (err) {
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        success: false,
        message: err.message
      });
    }
  }

  public create = async (req: Request, res: Response): Promise<any> => {
    try {
      console.log('req: ', req)

      if (!req.body || !req.body.orderId || !req.body.refNo || !req.body.paymentAmount
        || !req.body.customerName) throw ReferenceError("Invalid Parameter");

      const paymentLog: PaymentLogDao = new PaymentLogDao()
      const payment: PaymentDao = new PaymentDao()

      const paymentRequestId = `${moment().valueOf()}${req.body.orderId}`
      const paymentTime = moment().format('YYYY-MM-DDTHH:mm:ss')

      const partnerId = config.REFERENCE_PARTNER_ID
      const appId = config.REFERENCE_APP_ID

      const paymentLogObj: IPaymentLog = {
        partnerId: String(partnerId),
        paymentRequestId,
        paymentAmount: req.body.paymentAmount,
        paymentTime,
        paymentStatus: 'INITIATED',
        paymentFailReason: '',
      }

      // await paymentLog.saveItem(paymentLogObj)
      // await payment.saveItem({ ...paymentLogObj, orderId: req.body.refNo, appId: String(appId)})

    //   {
    //     "partnerId": "217020000648273837215",
    //     "appId": "2170020135085685",
    //     "paymentRequestId": "16729804565398zdHkwhXR3jrdMfOJGhr",
    //     "paymentOrderTitle": "Food",
    //     "productCode": "51090000001432700001",
    //     "paymentAmount": {
    //         "currency": "PHP",
    //         "value": "10000"
    //     },
    //     "paymentFactor": {
    //         "isCashierPayment": true
    //     },
    //     "paymentReturnUrl": "",
    //     "paymentNotifyUrl": "",
    //     "extendInfo": "{\"customerBelongsTo\":\"GCASH\"}"
    // }
    
    
      const result = await PaymentService.gcashPay({
        partnerId,
        appId,
        paymentRequestId,
        paymentOrderTitle: "FOOD",
        productCode: "51090000001432700001",
        paymentAmount: req.body.paymentAmount,
        paymentFactor: {
            isCashierPayment: true
        },
        paymentReturnUrl: "",
        paymentNotifyUrl: ""
      });

      res.status(200).send({
        success: true,
        result: result.data
      });
    } catch (err) {
      res.status(err instanceof ReferenceError ? 400 : 500).send({
        success: false,
        message: `ERR CATCH: ${err.message}`
      });
    }
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

  /**
   * This will update the current location of the rider
   * in parallel of saving heatmap
   */
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

export default Payment;
