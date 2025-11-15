"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uploader = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinary_env_1 = require("../config/env/cloudinary.env");
const streamifier_1 = __importDefault(require("streamifier"));
class Uploader {
    constructor() {
        this.cloudinary = cloudinary_1.v2;
        cloudinary_1.v2.config({
            cloud_name: cloudinary_env_1.CLOUDINARY_CLOUD_NAME,
            api_key: cloudinary_env_1.CLOUDINARY_API_KEY,
            api_secret: cloudinary_env_1.CLOUDINARY_API_SECRET,
        });
    }
    static async upload(location, file) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                folder: "tahakhadar/" + location.replace(/^\//g, ""),
            }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            streamifier_1.default.createReadStream(file).pipe(stream);
        });
    }
    static async destroy(publicId) {
        try {
            return cloudinary_1.v2.uploader.destroy(publicId, {
                resource_type: "image",
            });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
exports.Uploader = Uploader;
