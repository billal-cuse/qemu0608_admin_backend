export * from "./list"

interface Assessment {
    id: string;
    name: string;
}

interface Airline {
    id: string;
    name: string;
}

export interface Submission {
    id: string;
    deviceId: string;
    status: string;
    date: string;
    airline: Airline;
    assessments: Assessment[];
}