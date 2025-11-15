"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlinesRouter = exports.AirlinesRoute = void 0;
const express_1 = require("express");
const airlines_controller_1 = require("./airlines.controller");
class AirlinesRoute {
    constructor(controller = new airlines_controller_1.AirlinesController()) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.router.route("/").get(controller.getAll).post(controller.create);
        this.router.route("/search").get(controller.search);
        this.router
            .route("/:id")
            .get(controller.getById)
            .patch(controller.update)
            .delete(controller.delete);
    }
}
exports.AirlinesRoute = AirlinesRoute;
exports.AirlinesRouter = new AirlinesRoute().router;
