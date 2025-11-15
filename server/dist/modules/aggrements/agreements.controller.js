"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgreementsController = void 0;
const AsyncHandler_1 = require("../../lib/AsyncHandler");
const agreements_schema_1 = require("./schema/agreements.schema");
const agreements_services_1 = require("./agreements.services");
const ResponseApi_1 = require("../../lib/ResponseApi");
class AgreementsController {
    constructor() {
        this.get = (0, AsyncHandler_1.asyncHandler)(async (req, res, next) => {
            const body = agreements_schema_1.AgreementsSchema.parse(req.body);
            const agreement = await agreements_services_1.AgreementsService.get(body);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Agreements", agreement);
        });
        this.create = (0, AsyncHandler_1.asyncHandler)(async (req, res, next) => {
            const body = agreements_schema_1.CreateAgreementsSchema.parse(req.body);
            const agreement = await agreements_services_1.AgreementsService.create(body);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Agreements", agreement);
        });
        this.update = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const body = agreements_schema_1.UpdateAgreementsSchema.parse(req.body);
            const { id } = req.params;
            const agreement = await agreements_services_1.AgreementsService.update(id, body);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Agreements", agreement);
        });
    }
}
exports.AgreementsController = AgreementsController;
