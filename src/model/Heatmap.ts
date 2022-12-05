import { Model, model, Schema } from "mongoose";
import { IHeatmap } from "../interfaces/Heatmap";

const HeatmapSchema = Schema(
  {
    job_id: {
      type: String,
      required: true,
      trim: true
    },
    client_id: {
      type: String,
      required: true
    },
    hub_id: {
      type: String,
      trim: true
    },
    rider_id: {
      type: String
    },
    points: [{
      latitude: Number,
      longitude: Number
    }]
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export const Heatmap: Model<IHeatmap> = model<IHeatmap>("Heatmap", HeatmapSchema);

