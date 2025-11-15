import { asyncHandler } from "../../lib/AsyncHandler";
import { PaymentService } from "./payment.service";
import { ResponseApi } from "../../lib/ResponseApi";
import { STRIPE_WEBHOOK_SECRET } from "./config/stripe.env";
import stripe from "./config/stripe";
import { PaymentSchema } from "./schema/payment.schema";
import prisma from "../../config/prisma";

export class PaymentController {
  static webhook = asyncHandler(async (req, res) => {
    const sig = req.headers["stripe-signature"]!;

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        STRIPE_WEBHOOK_SECRET,
      );

      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object;
          const paymentIntentId = session.payment_intent as string;
          const email = session.customer_details?.email || "";
          const name = session.customer_details?.name || "";
          const amount = session.amount_total ? session.amount_total / 100 : 0;

          await prisma.payment.create({
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
    } catch (error) {
      console.error(error);
    }
  });

  createPaymentSession = asyncHandler(async (req, res) => {
    const body = PaymentSchema.parse(req.body);

    const session = await this.paymentService.createPaymentSession(body);

    return ResponseApi(res, 200, "success", {
      url: session?.url,
    });
  });

  payments = asyncHandler(async (req, res) => {
    const payments = await this.paymentService.allPayments();
    return ResponseApi(res, 200, "all payments", payments);
  });

  payment = asyncHandler(async (req, res) => {
    const payment = await this.paymentService.payment(req.params.id);
    if (!payment) return ResponseApi(res, 404, "Payment not found");
    return ResponseApi(res, 200, "payment", payment);
  });

  deletePayment = asyncHandler(async (req, res) => {
    const payment = await this.paymentService.deletePayment(req.params.id);
    if (!payment) return ResponseApi(res, 404, "Payment not found");
    return ResponseApi(res, 200, "successfully deleted");
  });

  constructor(private readonly paymentService = new PaymentService()) {}
}
