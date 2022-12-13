export interface IHeatmap {
    job_ids: Array<number>,
    client_id: string,
    hub_id: string,
    rider_id: string,
    points: [{
        lat: String,
        long: String
    }],
    createdAt: Date
}

export interface IParams {
    job_id: string,
    clientId: string,
    hubId: string,
    riderId: string,
    points?: [{
        lat: String,
        long: String
    }],
    from?: string,
    to?: string
}

interface IExtras {
    job_ids?: Array<String>,
    locationProvider?: Map<String, String>,
    freeStorage?: Number,
    maxMemory?: Number,
    powerState?: Map<String, String>,
    appVersion?: String,
    apiLevel?: Number,
    androidVersion: String,
    deviceName: String,
    connectionType?: Map<String, String>,
    otherJobIds: Record<string, Array<string>>
}

export interface ILocation {
    timestamp: string,
    coords: {
        latitude: Number,
        longitude: Number
    },
    extras: IExtras
}

export interface ITransistorSoft {
    location: Array<ILocation>,
    lasttimestamp: string,
    job_id: string,
    client_id: string,
    hub_id: string,
    rider_id: string,
}
