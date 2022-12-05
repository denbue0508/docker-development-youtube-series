export interface IDevice {
    job_ids: Array<String>,
    client_id: String,
    hub_id: String,
    rider_id: String,
    location_provider?: Map<String, String>,
    power_state?: Map<String, String>,
    app_version?: String,
    api_level?: Number,
    connection_type?: Map<String, String>,
    android_version?: String
    device_name?: String
    free_storage?: Number,
    max_memory?: Number,
    transaction_date: Date
}