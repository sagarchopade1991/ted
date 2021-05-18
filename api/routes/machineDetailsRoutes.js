const machineDetailController = require('../controller/machineDetailController');

module.exports = function (app) {
  app.get('/getLocation', machineDetailController.getLocation);
};
