import { Heatmap } from '../model/Heatmap';
import { IParams, ITransistorSoft } from '../interfaces/Heatmap';
import * as moment from 'moment-timezone'

class HeatmapDao {
  constructor() {

  }
  public getHeatmap = async (params: IParams): Promise<any> => {
    const { riderId, clientId, hubId, from, to } = params;

    return await Heatmap.find({
      client_id: clientId,
      hub_id: hubId,
      rider_id: riderId,
      createdAt: {
        $gte: moment(from).startOf('day').toDate(),
        $lte: moment(to).endOf('day').toDate()
      }
    })
  }

  public saveOrUpdate = async (params: ITransistorSoft): Promise<any> => {

    const today = moment(params.lasttimestamp).startOf('day');
    const { rider_id, client_id, hub_id, job_id } = params;
    let filter = {
      job_id: job_id,
      client_id: client_id,
      hub_id: hub_id,
      rider_id: rider_id,
      createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate()
      }
    }

    const data = await Heatmap.findOne(filter);

    if (data != null) {
      this.updateItem(filter, params);
    } else {
      this.saveItem(params);
    }
  }

  private saveItem = async (params: ITransistorSoft) => {
    new Heatmap({
      job_id: params.job_id,
      client_id: params.client_id,
      hub_id: params.hub_id,
      rider_id: params.rider_id,
      createdAt: moment(params.lasttimestamp).startOf('day'),
      updateAt: moment(params.lasttimestamp).endOf('day'),
      points: params.location.map(item => item.coords)
    }).save();
  }

  private saveItems = async (jobIds: Array<number>, params: ITransistorSoft) => {
    if (jobIds.length > 0) {
      jobIds.forEach(async jobId => {
        await new Heatmap({
          job_id: jobId,
          client_id: params.client_id,
          hub_id: params.hub_id,
          rider_id: params.rider_id,
          createdAt: moment(params.lasttimestamp).startOf('day'),
          updateAt: moment(params.lasttimestamp).endOf('day'),
          points: params.location.map(item => item.coords)
        }).save();
      })
    }
  }

  private updateItem = async (filter, params) => {
    await Heatmap.updateOne(filter, {
      updatedAt: moment(params.lasttimestamp).endOf('day'),
      $push:
      {
        points: {
          "$each": params.location.map(item => item.coords)
        }
      }
    });
  }

  private updateItems = async (jobIds, params, filter) => {
    if (jobIds.length > 0) {
      filter.job_id = {
        $in: jobIds
      }
      await Heatmap.updateMany(filter, {
        updatedAt: moment(params.lasttimestamp).endOf('day'),
        $push:
        {
          points: {
            "$each": params.location.map(item => item.coords)
          }
        }
      });
    }
  }

  private sortItems = async (jobIds, filter) => {
    let toSave = [], toUpdate = [];

    for (let jobId of jobIds) {
      filter.job_id = jobId;
      const data = await Heatmap.findOne(filter);
      data != null ? toUpdate.push(jobId) : toSave.push(jobId);
    }

    return { toSave, toUpdate }
  }

}

export default HeatmapDao