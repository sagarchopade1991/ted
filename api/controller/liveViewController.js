const sockerEmittor = require('./socketController').socketEmitter;
var config = require('../config/constants');

const io = require('../socket/socket').socketIo;

// @route      GET /getdemos
// @desc       Get demos list
// @access     Public
const getDemos = (req, res) => {
  try {
    const demos = [
      {
        name: 'Demo1',
        title: 'Vision Inspection',
        bgcolor: '#7360ED',
        path: 'defectDetections/live-view',
        id: '123',
        description:"Defect detection is one such method, employed by software engineers to test the software application for bugs and defects. "
      },
      {
        name: 'Demo2',
        title: "Mask/PPE",
        bgcolor: '#009DFA',
        path: 'compliance/dashboard',
        id: '234',
        description:"Mask/PPE Demo "
      },
      {
        name: 'Demo3',
        title:'Remote Monitoring',
        bgcolor: '#DC9D30',
        path: 'remoteMonitoring/dashboard',
        id: '345',
        description:"Remote Monitoring Demo "
      }
      
    ];
    res.json(demos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route      GET /getcameradetails
// @desc       Get camera details
// @access     Public
const getCameraDetails = (req, res) => {
  try {
    const cameraDetails = [
      {
        demoId: req.query.demoId,
        cameraId: 'TestCamera_' + req.query.demoId,
        cameraType: 'webcam',
        deviceName: 'TestCamera' + req.query.demoId,
        featureName: 'maskDetection' + req.query.demoId,
        streamingUrl: 'cam0' + req.query.demoId,
        status: 'Disconnected',
        isPlay: false,
        location: 'pune'
      }
    ];
    res.json(cameraDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route      GET /startEmitData
// @desc       Start emitting data
// @access     Public
const startEmitData = (req, res) => {
  try {
    let imageUrl = null;
    if (req.query.demoId === 123) {
      imageUrl = 'https://www.computerhope.com/jargon/r/random-dice.jpg';
    } else {
      imageUrl =
        'https://miro.medium.com/max/2625/1*VQBcSuSfFqSePJaEC0T5yg.jpeg';
    }

    config.isSetInterval = true;
    sockerEmittor(req);
    console.log('startEmitData........');
    const response = {
      msg: 'Successfull trigger start emit eventsss.'
    };
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route      GET /stopEmitData
// @desc       Stop emitting data
// @access     Public
const stopEmitData = (req, res) => {
  try {
    config.isSetInterval = false;
    const message = {
      msg: 'Successfull trigger stop emit event.'
    };
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getDemos = getDemos;
exports.getCameraDetails = getCameraDetails;
exports.startEmitData = startEmitData;
exports.stopEmitData = stopEmitData;
