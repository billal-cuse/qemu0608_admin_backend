"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRouter = exports.SubmissionRoute = void 0;
const express_1 = require("express");
const submission_controller_1 = require("./submission.controller");
class SubmissionRoute {
    constructor(controller = new submission_controller_1.SubmissionController()) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.router.route("/").get(controller.getAll);
        this.router.route("/:deviceId").get(controller.getAllByDeviceId);
        this.router.route("/").post(controller.create);
        this.router.route("/get/:id").get(controller.getById);
        this.router.route("/:id").patch(controller.update);
        this.router.route("/:id").delete(controller.delete);
    }
}
exports.SubmissionRoute = SubmissionRoute;
exports.SubmissionRouter = new SubmissionRoute().router;
