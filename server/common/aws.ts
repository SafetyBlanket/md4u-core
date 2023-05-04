// https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html
import aws from 'aws-sdk';
import L from './logger';

const { AWS_DEFAULT_REGION } = process.env;

aws.config.getCredentials((err: unknown) => {
  if (err) L.error(err);
  else L.debug(aws.config.credentials);
});

aws.config.update({ region: AWS_DEFAULT_REGION });
