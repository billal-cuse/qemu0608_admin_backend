"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
class PaymentRoute {
    constructor(controller = new payment_controller_1.PaymentController()) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.router.route("/create-payment").post(controller.createPaymentSession);
        this.router.route("/").get(controller.payments);
        this.router
            .route("/:id")
            .get(controller.payment)
            .delete(controller.deletePayment);
    }
}
exports.PaymentRouter = new PaymentRoute().router;
