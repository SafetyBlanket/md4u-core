import { Request, Response } from 'express';
import aws from 'aws-sdk';
import L from '../../../common/logger';
import CloudwatchService from '../../services/cloudwatch.service';

export class LogsController {
  cloudwatchService: typeof CloudwatchService;

  constructor(svc: typeof CloudwatchService) {
    this.cloudwatchService = svc;
  }

  list = async (req: Request, res: Response) => {
    try {
      const { group, stream } = req.params;
      return res.json(
        await this.cloudwatchService.list(String(group), String(stream))
      );
    } catch (error) {
      L.error(`LogsController->list:Error ${error.message}`);
      return res.sendStatus(500);
    }
  };
}
export default new LogsController(CloudwatchService);
