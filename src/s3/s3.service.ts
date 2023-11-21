// src/s3/s3.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { S3Object } from './s3-object.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class S3Service {
  constructor(@InjectModel(S3Object.name) private readonly s3ObjectModel: Model<S3Object>) {}

  async createBucket(bucket: string): Promise<void> {
    await this.s3ObjectModel.create({ bucket, key: '__bucket_marker__', data: Buffer.from('') });
  }

  async getObject(bucket: string, key: string): Promise<Buffer | null> {
    const s3Object = await this.s3ObjectModel.findOne({ bucket, key }).exec();
    return s3Object ? s3Object.data : null;
  }

  async putObject(bucket: string, key: string, data: Buffer): Promise<void> {
    await this.s3ObjectModel.create({ bucket, key, data });
  }

  async deleteObject(bucket: string, key: string): Promise<void> {
    await this.s3ObjectModel.deleteOne({ bucket, key }).exec();
  }

  async listObjects(bucket: string): Promise<string[]> {
    const objects = await this.s3ObjectModel.find({ bucket }).exec();
    return objects.map((obj) => obj.key);
  }

  async listBuckets(): Promise<string[]> {
    const buckets = await this.s3ObjectModel.distinct('bucket').exec();
    return buckets;
  }
}
