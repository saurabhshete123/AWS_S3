// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Service } from './s3/s3.service';
import { S3Controller } from './s3/s3.controller';
import { S3Object, S3ObjectSchema } from './s3/s3-object.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://saurabhshete281:JBmRPjzC58VOejIX@cluster0.jih1tjw.mongodb.net/AWS_S3_NESTJS_2'),
    MongooseModule.forFeature([{ name: S3Object.name, schema: S3ObjectSchema }]),
  ],
  controllers: [S3Controller],
  providers: [S3Service],
})
export class AppModule {}
