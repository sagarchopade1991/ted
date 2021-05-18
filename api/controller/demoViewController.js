const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline
} = require('@azure/storage-blob');
const getStream = require('into-stream');
const uuid = require('uuid-random');
const Protocol = require('azure-iot-device-mqtt').Mqtt;
const Client = require('azure-iot-device').Client;
const Message = require('azure-iot-device').Message;

const constants = require('../config/constants');
const connectionString = constants.deviceConnectionString;
var client = Client.fromConnectionString(connectionString, Protocol);

const containerName = 'raw-images';
const sharedKeyCredential = new StorageSharedKeyCredential(
  constants.storageAccountConfig.azureStorageAccountName,
  constants.storageAccountConfig.azureStorageAccountAccessKey
);
const pipeline = newPipeline(sharedKeyCredential);
const blobServiceClient = new BlobServiceClient(
  `https://${constants.storageAccountConfig.azureStorageAccountName}.blob.core.windows.net`,
  pipeline
);
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = {
  bufferSize: 4 * ONE_MEGABYTE,
  maxBuffers: 20
};

const getBlobName = (originalName) => {
  const identifier = Math.random().toString().replace(/0\./, '');
  return `${identifier}-${originalName}`;
};

// @route      POST /uploadImg
// @desc       Show results for proceeded image
// @access     Public
const upload = async (req, res) => {
  try {
console.log("upload.............", req.body)

    const blobName = getBlobName(req.file.originalname);
    const stream = getStream(req.file.buffer);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadStream(
      stream,
      uploadOptions.bufferSize,
      uploadOptions.maxBuffers,
      {
        blobHTTPHeaders: {
          blobContentType: 'image/jpeg'
        }
      }
    );
    res.json({ message: 'File uploaded to Azure Blob storage.' });

    //send event to iothub
    var message = new Message(
      `https://${constants.storageAccountConfig.azureStorageAccountName}.blob.core.windows.net/${containerName}/${blobName}`
    );
    message.messageId = uuid();

    client.sendEvent(message, function (err) {
      if (err) {
        console.error('Could not send: ' + err.toString());
      } else {
        console.log('Message sent: ' + message.messageId);
      }
    });
    // send post request
    // const message = {
    //   demoId: req.query.demoId,
    //   cameraId: 'TestCamera_' + req.query.demoId,
    //   origImg: 'https://www.computerhope.com/jargon/r/random-dice.jpg',
    //   resultImg: 'https://www.computerhope.com/jargon/r/random-dice.jpg',
    //   maskImg: 'https://www.computerhope.com/jargon/r/random-dice.jpg',
    //   results: {
    //     labels: ['label1', 'label2'],
    //     data: [
    //       {
    //         value: random.int((min = 0), (max = 10)),
    //         time: Date.now()
    //       },
    //       {
    //         value: random.int((min = 0), (max = 10)),
    //         time: Date.now()
    //       },
    //       {
    //         value: random.int((min = 0), (max = 10)),
    //         time: Date.now()
    //       },
    //       {
    //         value: random.int((min = 0), (max = 10)),
    //         time: Date.now()
    //       }
    //     ]
    //   }
    // };
    // res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.upload = upload;
