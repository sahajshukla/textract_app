
const s3 = new AWS.S3({
    apiVersion: '2012-10-17',
    region: 'us-east-1',
    credentials: {
      accessKeyId: temporaryAccessKeyId,
      secretAccessKey: temporarySecretAccessKey,
      sessionToken: temporarySessionToken
    }
  });