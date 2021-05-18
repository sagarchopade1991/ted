var io = require('../socket/socket').socketIo;
const { EventHubConsumerClient } = require('@azure/event-hubs');
const constants = require('../config/constants');

const eventHubsCompatibleEndpoint =
  constants.eventHubConfig.eventHubsCompatibleEndpoint;
const eventHubsCompatiblePath =
  constants.eventHubConfig.eventHubsCompatiblePath;
const iotHubSasKey = constants.eventHubConfig.iotHubSasKey;

const connectionString = `Endpoint=${eventHubsCompatibleEndpoint}/;EntityPath=${eventHubsCompatiblePath};SharedAccessKeyName=service;SharedAccessKey=${iotHubSasKey}`;

var printError = function (err) {
  console.log(err.message);
};

var printMessages = function (messages) {
  for (const message of messages) {
    if (
      message.systemProperties['iothub-connection-module-id'] ===
      'DataAnomalyProcessor'
    ) {
      io.emit('anomalyData', {
        message: JSON.stringify(message.body[0])
      });
    }
    if (
      message.systemProperties['iothub-connection-module-id'] ===
      'ReplayDataPublisher'
    ) {
      io.emit('machineRecordData', {
        message: JSON.stringify(message.body)
      });
    }
  }
};

const clientOptions = {};

const consumerClient = new EventHubConsumerClient(
  '$Default',
  connectionString,
  clientOptions
);

consumerClient.subscribe({
  processEvents: printMessages,
  processError: printError
});
