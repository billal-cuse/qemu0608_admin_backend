"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("./config/stripe"));
const prisma_1 = __importDefault(require("../../config/prisma"));
class PaymentService {
    async createPaymentSession(data) {
        return await stripe_1.default.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        unit_amount: data.amount,
                        product_data: {
                            name: "Donation",
                            description: "Support our project",
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
        });
    }
    async allPayments() {
        return prisma_1.default.payment.findMany();
    }
    async payment(id) {
        return prisma_1.default.payment.findUnique({
            where: {
                id,
            },
        });
    }
    async updatePayment(id, data) {
        return prisma_1.default.payment.update({
            where: {
                id,
            },
            data,
        });
    }
    async deletePayment(id) {
        return prisma_1.default.payment.delete({
            where: {
                id,
            },
        });
    }
}
exports.PaymentService = PaymentService;
