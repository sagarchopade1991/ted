const liveViewController = require('../controller/liveViewController');

module.exports = function (app) {
  app.get('/getDemos', liveViewController.getDemos);
  app.get('/getCameraDetails', liveViewController.getCameraDetails);
  app.get('/startEmitData', liveViewController.startEmitData);
  app.get('/stopEmitData', liveViewController.stopEmitData);
};
