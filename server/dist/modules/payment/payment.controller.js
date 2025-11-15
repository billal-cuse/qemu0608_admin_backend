"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const AsyncHandler_1 = require("../../lib/AsyncHandler");
const payment_service_1 = require("./payment.service");
const ResponseApi_1 = require("../../lib/ResponseApi");
const stripe_env_1 = require("./config/stripe.env");
const stripe_1 = __importDefault(require("./config/stripe"));
const payment_schema_1 = require("./schema/payment.schema");
const prisma_1 = __importDefault(require("../../config/prisma"));
class PaymentController {
    constructor(paymentService = new payment_service_1.PaymentService()) {
        this.paymentService = paymentService;
        this.createPaymentSession = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const body = payment_schema_1.PaymentSchema.parse(req.body);
            const session = await this.paymentService.createPaymentSession(body);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "success", {
                url: session?.url,
            });
        });
        this.payments = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const payments = await this.paymentService.allPayments();
            return (0, ResponseApi_1.ResponseApi)(res, 200, "all payments", payments);
        });
        this.payment = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const payment = await this.paymentService.payment(req.params.id);
            if (!payment)
                return (0, ResponseApi_1.ResponseApi)(res, 404, "Payment not found");
            return (0, ResponseApi_1.ResponseApi)(res, 200, "payment", payment);
        });
        this.deletePayment = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const payment = await this.paymentService.deletePayment(req.params.id);
            if (!payment)
                return (0, ResponseApi_1.ResponseApi)(res, 404, "Payment not found");
            return (0, ResponseApi_1.ResponseApi)(res, 200, "successfully deleted");
        });
    }
}
exports.PaymentController = PaymentController;
_a = PaymentController;
PaymentController.webhook = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe_1.default.webhooks.constructEvent(req.body, sig, stripe_env_1.STRIPE_WEBHOOK_SECRET);
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object;
                const paymentIntentId = session.payment_intent;
                const email = session.customer_details?.email || "";
                const name = session.customer_details?.name || "";
                const amount = session.amount_total ? session.amount_total / 100 : 0;
                await prisma_1.default.payment.create({
                    data: {
                        transactionId: paymentIntentId,
                        amount,
                        email,
                        name,
                    },
                });
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
    }
    catch (error) {
        console.error(error);
    }
});
