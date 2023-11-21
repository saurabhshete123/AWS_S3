// src/s3/s3.controller.ts
import { Controller, Get, Param, Post, Delete, Body, HttpException, HttpStatus } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get('buckets')
  async listBuckets(): Promise<string[]> {
    return this.s3Service.listBuckets();
  }

  @Post('buckets')
  async createBucket(@Body() body: { bucket: string }): Promise<void> {
    try {
      const { bucket } = body;
      if (!bucket || typeof bucket !== 'string') {
        throw new Error('Invalid bucket name');
      }
      await this.s3Service.createBucket(bucket);
    } catch (error) {
      console.error('Error in createBucket:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':bucket/objects')
  async listObjects(@Param('bucket') bucket: string): Promise<string[]> {
    return this.s3Service.listObjects(bucket);
  }

  @Get(':bucket/objects/:key')
  async getObject(@Param('bucket') bucket: string, @Param('key') key: string): Promise<Buffer | null> {
    return this.s3Service.getObject(bucket, key);
  }

  @Post(':bucket/objects/:key')
  async putObject(
    @Param('bucket') bucket: string,
    @Param('key') key: string,
    @Body() data: Buffer
  ): Promise<void> {
    await this.s3Service.putObject(bucket, key, data);
  }

  @Delete(':bucket/objects/:key')
  async deleteObject(@Param('bucket') bucket: string, @Param('key') key: string): Promise<void> {
    await this.s3Service.deleteObject(bucket, key);
  }
}
