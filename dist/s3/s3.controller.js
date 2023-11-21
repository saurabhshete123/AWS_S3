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
exports.S3Controller = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("./s3.service");
let S3Controller = class S3Controller {
    constructor(s3Service) {
        this.s3Service = s3Service;
    }
    async listBuckets() {
        return this.s3Service.listBuckets();
    }
    async createBucket(body) {
        try {
            const { bucket } = body;
            if (!bucket || typeof bucket !== 'string') {
                throw new Error('Invalid bucket name');
            }
            await this.s3Service.createBucket(bucket);
        }
        catch (error) {
            console.error('Error in createBucket:', error);
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async listObjects(bucket) {
        return this.s3Service.listObjects(bucket);
    }
    async getObject(bucket, key) {
        return this.s3Service.getObject(bucket, key);
    }
    async putObject(bucket, key, data) {
        await this.s3Service.putObject(bucket, key, data);
    }
    async deleteObject(bucket, key) {
        await this.s3Service.deleteObject(bucket, key);
    }
};
exports.S3Controller = S3Controller;
__decorate([
    (0, common_1.Get)('buckets'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "listBuckets", null);
__decorate([
    (0, common_1.Post)('buckets'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "createBucket", null);
__decorate([
    (0, common_1.Get)(':bucket/objects'),
    __param(0, (0, common_1.Param)('bucket')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "listObjects", null);
__decorate([
    (0, common_1.Get)(':bucket/objects/:key'),
    __param(0, (0, common_1.Param)('bucket')),
    __param(1, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "getObject", null);
__decorate([
    (0, common_1.Post)(':bucket/objects/:key'),
    __param(0, (0, common_1.Param)('bucket')),
    __param(1, (0, common_1.Param)('key')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Buffer]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "putObject", null);
__decorate([
    (0, common_1.Delete)(':bucket/objects/:key'),
    __param(0, (0, common_1.Param)('bucket')),
    __param(1, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "deleteObject", null);
exports.S3Controller = S3Controller = __decorate([
    (0, common_1.Controller)('s3'),
    __metadata("design:paramtypes", [s3_service_1.S3Service])
], S3Controller);
//# sourceMappingURL=s3.controller.js.map