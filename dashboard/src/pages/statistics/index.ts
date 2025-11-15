export * from "./dashboard"

export interface IStatistics {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        totalSubmissions: number;
        totalPass: number;
        totalFail: number;
        totalAirlines: number;
    }
}

