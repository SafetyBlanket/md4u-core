import aws from 'aws-sdk/';
// import L from '../../common/logger';

export class CloudwatchService {
  cloudwatchService: aws.CloudWatchLogs;

  constructor(service: aws.CloudWatchLogs) {
    this.cloudwatchService = service;
  }

  list = async (logGroupName: string, logStreamName: string) => {
    const logs = await this.cloudwatchService
      .getLogEvents({
        logGroupName,
        logStreamName,
      })
      .promise();
    return logs;
  };
}

export default new CloudwatchService(new aws.CloudWatchLogs());
