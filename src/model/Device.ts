import { Model, model, Schema } from "mongoose";
import { IDevice } from "../interfaces/Device";

const DeviceSchema = Schema(
  {
    job_ids: {
      type: Array,
      of: String,
      required: true,
      trim: true
    },
    client_id: {
      type: String,
      required: true
    },
    hub_id: {
      type: String,
      trim: true,
      required: true,
    },
    rider_id: {
      type: String,
      required: true
    },
    location_provider: {
      type: Map,
      of: String,
    },
    power_state: {
      type: Map,
      of: String,
    },
    app_version: {
      type: String
    },
    api_level: {
      type: String
    },
    connection_type: {
      type: Map,
      of: String
    },
    free_storage: {
      type: Number
    },
    max_memory: {
      type: Number
    },
    android_version: {
      type: String
    },
    device_name: {
      type: String
    },
    transaction_date: {
      type: Date
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);
DeviceSchema.index({createdAt: 1},{expireAfterSeconds: 86400}); //24h
export const Device: Model<IDevice> = model<IDevice>("Device", DeviceSchema);

