const io = require('../socket/socket').socketIo;
var config = require('../config/constants');
const random = require('random');

const staticImageArray = [
  'https://miro.medium.com/max/2528/1*nDk7BKtLagDuJATNp6r4iA.jpeg',
  'https://www.onetech.ai/wp-content/uploads/2020/07/ai-enabled.jpg'
];
// 'https://www.onetech.ai/wp-content/uploads/2020/07/ai-enabled.jpg'
const socketEmitter = (req) => {
  const interval = setInterval(() => {
    let imageUrl = staticImageArray[random.int((min = 0), (max = 1))];
    const message = {
      demoId: req.query.demoId,
      cameraId: req.query.cameraId,
      origImg: imageUrl,
      resultImg: imageUrl,
      maskImg: imageUrl,
      labels: ['label1'],
      results: [
        {
          value: random.int((min = 0), (max = 10)),
          time: Date.now()
        },
        {
          value: random.int((min = 0), (max = 10)),
          time: Date.now()
        },
        {
          value: random.int((min = 0), (max = 10)),
          time: Date.now()
        },
        {
          value: random.int((min = 0), (max = 10)),
          time: Date.now()
        }
      ]
    };
    console.log('Emitting :', message);
    io.emit('liveViewResults', {
      message: message
    });
    if (config.isSetInterval == false) {
      console.log('Stopping emitting');
      clearInterval(interval);
    }
  }, 3000);
};

exports.socketEmitter = socketEmitter;
