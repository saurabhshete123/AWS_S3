"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const s3_service_1 = require("./s3/s3.service");
const s3_controller_1 = require("./s3/s3.controller");
const s3_object_model_1 = require("./s3/s3-object.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://saurabhshete281:JBmRPjzC58VOejIX@cluster0.jih1tjw.mongodb.net/AWS_S3_NESTJS_2'),
            mongoose_1.MongooseModule.forFeature([{ name: s3_object_model_1.S3Object.name, schema: s3_object_model_1.S3ObjectSchema }]),
        ],
        controllers: [s3_controller_1.S3Controller],
        providers: [s3_service_1.S3Service],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map