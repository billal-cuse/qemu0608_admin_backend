export * from "./list"

export interface Payment {
    id: string;
    transactionId: string
    amount: string
    name: string
    email: string;
    createdAt: string
    updatedAt: string
}
