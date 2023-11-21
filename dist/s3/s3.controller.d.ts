/// <reference types="node" />
import { S3Service } from './s3.service';
export declare class S3Controller {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    listBuckets(): Promise<string[]>;
    createBucket(body: {
        bucket: string;
    }): Promise<void>;
    listObjects(bucket: string): Promise<string[]>;
    getObject(bucket: string, key: string): Promise<Buffer | null>;
    putObject(bucket: string, key: string, data: Buffer): Promise<void>;
    deleteObject(bucket: string, key: string): Promise<void>;
}
