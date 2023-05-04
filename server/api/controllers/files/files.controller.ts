import { Request, Response } from 'express';
import L from '../../../common/logger';
import S3Service from '../../services/s3.service';

export class FilesController {
  s3Service: typeof S3Service = S3Service;

  constructor(s3Service: typeof S3Service) {
    this.s3Service = s3Service;
  }

  list = async (req: Request, res: Response) => {
    try {
      const { bucket } = req.params;
      return res.json(await this.s3Service.listFiles(bucket));
    } catch (error) {
      L.error(`FilesController->list:Error ${error.message}`);
      return res.sendStatus(500);
    }
  };

  upload = async (req: Request & { files: object[] }, res: Response) => {
    try {
      const { bucket } = req.params;
      const { fileName } = req.body;
      const { files } = req;

      console.log('files', files);

      this.s3Service.uploadFile(bucket, files[0], fileName);

      res.sendStatus(201);
    } catch (error) {
      L.error(`FilesController->upload:Error ${error.message}`);
      res.sendStatus(500);
    }
  };

  delete = async (_req: Request, res: Response) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      L.error(`FilesController->delete:Error ${error.message}`);
    }
  };
}
export default new FilesController(S3Service);
