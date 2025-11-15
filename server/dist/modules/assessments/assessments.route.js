"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentsRouter = exports.AssessmentsRoute = void 0;
const express_1 = require("express");
const assessments_controller_1 = require("./assessments.controller");
class AssessmentsRoute {
    constructor(controller = new assessments_controller_1.AssessmentsController()) {
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
exports.AssessmentsRoute = AssessmentsRoute;
exports.AssessmentsRouter = new AssessmentsRoute().router;
