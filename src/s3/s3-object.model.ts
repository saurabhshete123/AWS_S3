// src/s3/s3-object.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class S3Object extends Document {
  @Prop()
  bucket: string;

  @Prop()
  key: string;

  @Prop()
  data: Buffer;
}

export const S3ObjectSchema = SchemaFactory.createForClass(S3Object);
