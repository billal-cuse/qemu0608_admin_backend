"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentsController = void 0;
const AsyncHandler_1 = require("../../lib/AsyncHandler");
const ResponseApi_1 = require("../../lib/ResponseApi");
const assessments_service_1 = require("./assessments.service");
const assessments_schema_1 = require("./assessments.schema");
class AssessmentsController {
    constructor() {
        this.getAll = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const assessments = await assessments_service_1.AssessmentsService.getAllAssessments();
            return (0, ResponseApi_1.ResponseApi)(res, 200, "All Assessments", assessments);
        });
        this.getById = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const assessment = await assessments_service_1.AssessmentsService.getAssessmentById(id);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Assessment Details", assessment);
        });
        this.create = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const body = assessments_schema_1.CreateAssessmentsSchema.parse(req.body);
            const assessment = await assessments_service_1.AssessmentsService.createAssessment(body.name);
            return (0, ResponseApi_1.ResponseApi)(res, 201, "Assessment Created", assessment);
        });
        this.update = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const body = assessments_schema_1.UpdateAssessmentsSchema.parse(req.body);
            const assessment = await assessments_service_1.AssessmentsService.updateAssessment(id, body.name);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Assessment Updated", assessment);
        });
        this.delete = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            await assessments_service_1.AssessmentsService.deleteAssessment(id);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Assessment Deleted");
        });
        this.search = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { assessment: query } = req.query;
            const assessments = await assessments_service_1.AssessmentsService.searchAssessments(query);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Search Results", assessments);
        });
    }
}
exports.AssessmentsController = AssessmentsController;
