var config = {
  isSetInterval: false,
  httpStatusCodes: {
    success: 200,
    resourceCreated: 201,
    requestAccepted: 202,
    noContent: 204,
    badRequest: 400,
    unAuthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    unprocessableEntity: 422,
    tooManyRequests: 429,
    internalError: 500,
    serviceUnavailable: 503
  },
  mongodbValidationError: 'ValidationError',
  mongodbDuplicateDataError: 11000,
  pathsForAuthorization: [
    '/UploadAndTriggerPipeline',
    '/customvisionsrv',
    '/camera',
    '/camera',
    '/camera/:id',
    '/camera/:id',
    '/saveDashboardLayout',
    '/camera/:id',
    '/cameraStart/:id',
    '/cameraStop/:id'
  ],
  roles: {
    superAdmin: 'SuperAdmin',
    admin: 'Admin'
  },
  eventHubConfig: {
    eventHubsCompatibleEndpoint:
      'sb://ihsuproddmres014dednamespace.servicebus.windows.net',
    eventHubsCompatiblePath: 'iothub-ehub-iot-hub-po-6265990-6cffd23b0a',
    iotHubSasKey: 'peYyIWzqN1+GA88wXu84LPjDD+fsxKYvTplThdL0ui0='
  },
  storageAccountConfig: {
    azureStorageAccountName: 'strgpocenv',
    azureStorageAccountAccessKey:
      'aaUPyI0GHWnU25k8qwqO8PJgAlinP7HlxWLlx/RDAauvWQM9ZXoBqZBOfTzPs8Uooqo3JcKbA4A/beNu2BzS7g=='
  },
  deviceConnectionString:
    'HostName=iot-hub-poc-env.azure-devices.net;DeviceId=ted-device;SharedAccessKey=1/g0/dXOC/0e3NydN0ewc4fgL5MMAg9t4j0FFfyszxE='
};
module.exports = config;
