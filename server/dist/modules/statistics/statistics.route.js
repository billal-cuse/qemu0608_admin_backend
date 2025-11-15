"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsRouter = exports.StatisticsRoute = void 0;
const express_1 = require("express");
const statistics_controller_1 = require("./statistics.controller");
class StatisticsRoute {
    constructor(controller = new statistics_controller_1.StatisticsController()) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.router.route("/").get(controller.getStatistics);
        this.router.route("/airlines-overview").get(controller.airlinesOverview);
        this.router.route("/top-airlines-pass-rate").get(controller.byPassRate);
        this.router.route("/top-airlines-submission").get(controller.bySubmissions);
    }
}
exports.StatisticsRoute = StatisticsRoute;
exports.StatisticsRouter = new StatisticsRoute().router;
