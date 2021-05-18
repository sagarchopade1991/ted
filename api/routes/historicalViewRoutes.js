const historicalViewController = require('../controller/historicalViewController');

module.exports = function (app) {
  app.get('/getHistoryResults', historicalViewController.getHistoryResults);
};
