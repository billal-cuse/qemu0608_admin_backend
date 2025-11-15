"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgreementsRouter = void 0;
const express_1 = require("express");
const agreements_controller_1 = require("./agreements.controller");
const authenticated_1 = require("../auth/gurard/authenticated");
class AgreementsRoute {
    constructor(controller = new agreements_controller_1.AgreementsController()) {
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.router.route("/").get(authenticated_1.Authenticate, controller.get);
        this.router.route("/").post(authenticated_1.Authenticate, controller.create);
        this.router.route("/:id").put(authenticated_1.Authenticate, controller.update);
    }
}
exports.AgreementsRouter = new AgreementsRoute().router;
