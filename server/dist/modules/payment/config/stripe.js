"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripe_env_1 = require("./stripe.env");
exports.default = new stripe_1.default(stripe_env_1.STRIPE_SECRET_KEY);
