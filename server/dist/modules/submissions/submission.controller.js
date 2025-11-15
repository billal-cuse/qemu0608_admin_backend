"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionController = void 0;
const AsyncHandler_1 = require("../../lib/AsyncHandler");
const ResponseApi_1 = require("../../lib/ResponseApi");
const submission_service_1 = require("./submission.service");
const submission_schema_1 = require("./submission.schema");
class SubmissionController {
    constructor() {
        this.getAll = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { _start, _end } = submission_schema_1.SubmissionQuerySchema.parse(req.query);
            const { submissions, total } = await submission_service_1.SubmissionService.getAllSubmissions(_start, _end);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "All Submissions", submissions, { total });
        });
        this.getAllByDeviceId = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { _start, _end } = submission_schema_1.SubmissionQuerySchema.parse(req.query);
            const { submissions, total } = await submission_service_1.SubmissionService.getByDeviceId(req.params.deviceId);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "All Submissions", submissions, { total });
        });
        this.getById = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const submission = await submission_service_1.SubmissionService.getSubmissionById(id);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Submission Details", submission);
        });
        this.create = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const body = submission_schema_1.CreateSubmissionSchema.parse(req.body);
            const submission = await submission_service_1.SubmissionService.createSubmission(body);
            return (0, ResponseApi_1.ResponseApi)(res, 201, "Submission Created", submission);
        });
        this.update = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            const body = submission_schema_1.UpdateSubmissionSchema.parse(req.body);
            const submission = await submission_service_1.SubmissionService.updateSubmission(id, body);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Submission Updated", submission);
        });
        this.delete = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
            const { id } = req.params;
            await submission_service_1.SubmissionService.deleteSubmission(id);
            return (0, ResponseApi_1.ResponseApi)(res, 200, "Submission Deleted");
        });
    }
}
exports.SubmissionController = SubmissionController;
