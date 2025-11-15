import { Router } from "express";
import { PaymentController } from "./payment.controller";

class PaymentRoute {
  readonly router = Router();

  constructor(private readonly controller = new PaymentController()) {
    this.router.route("/create-payment").post(controller.createPaymentSession);
    this.router.route("/").get(controller.payments);

    this.router
      .route("/:id")
      .get(controller.payment)
      .delete(controller.deletePayment);
  }
}

export const PaymentRouter = new PaymentRoute().router;
