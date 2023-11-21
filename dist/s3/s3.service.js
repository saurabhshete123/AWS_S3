"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const s3_object_model_1 = require("./s3-object.model");
const mongoose_2 = require("@nestjs/mongoose");
let S3Service = class S3Service {
    constructor(s3ObjectModel) {
        this.s3ObjectModel = s3ObjectModel;
    }
    async createBucket(bucket) {
        await this.s3ObjectModel.create({ bucket, key: '__bucket_marker__', data: Buffer.from('') });
    }
    async getObject(bucket, key) {
        const s3Object = await this.s3ObjectModel.findOne({ bucket, key }).exec();
        return s3Object ? s3Object.data : null;
    }
    async putObject(bucket, key, data) {
        await this.s3ObjectModel.create({ bucket, key, data });
    }
    async deleteObject(bucket, key) {
        await this.s3ObjectModel.deleteOne({ bucket, key }).exec();
    }
    async listObjects(bucket) {
        const objects = await this.s3ObjectModel.find({ bucket }).exec();
        return objects.map((obj) => obj.key);
    }
    async listBuckets() {
        const buckets = await this.s3ObjectModel.distinct('bucket').exec();
        return buckets;
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(s3_object_model_1.S3Object.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], S3Service);
//# sourceMappingURL=s3.service.js.map