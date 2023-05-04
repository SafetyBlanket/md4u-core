import aws from 'aws-sdk/';
import L from '../../common/logger';
import { Base64EncodedString } from 'aws-sdk/clients/elastictranscoder';
const { AWS_S3_BUCKET } = process.env;

export class S3Service {
  bucketName: string;
  s3Service: aws.S3;

  constructor(bucketName: string, service: aws.S3) {
    if (!bucketName) L.error('S3Service bucket name is not set');
    this.bucketName = bucketName;
    this.s3Service = service;
  }

  get bucketParams() {
    return {
      Bucket: this.bucketName,
    };
  }

  listFiles = async (bucketName: string) => {
    try {
      return (
        await this.s3Service.listObjects({ Bucket: bucketName }).promise()
      ).Contents;
    } catch (error) {
      L.error(`S3Service->listFiles:Error ${error.message}`);
      return {};
    }
  };

  uploadFile = async (bucket: string, file: any, fileName: string) => {
    try {
      const params = {
        Bucket: bucket,
        Key: fileName,
        Body: file.buffer.toString(),
      };
      const result = await this.s3Service.putObject(params).promise();
      console.log('RESULT', result);
      L.info('S3Service->uploadFile:Success', result);
      return result;
    } catch (error) {
      L.error(`S3Service->uploadFile:Error ${error.message}`);
      return;
    }
  };
}

export default new S3Service(AWS_S3_BUCKET || '', new aws.S3());
