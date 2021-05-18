var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var http = require('http');
var server = http.createServer(app);
var constants = require('./api/config/constants');
var config = require('./settings');
var errorHandler = require('./api/errorhandler/errorhandler').errorHandler;
exports.server = server;
var socketIo = require('./api/socket/socket');
var iotHubEventListener = require('./api/iothub/iotHubEventListener');

var port = config.port;

/** CORS middleware */
var options = {
  inflate: true,
  limit: '50mb',
  type: 'multipart/form-data'
};
var options1 = {
  inflate: true,
  limit: '10mb',
  type: 'application/octet-stream'
};

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(bodyParser.raw(options));
// app.use(bodyParser.raw(options1));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: '*', credentials: false }));

/** Test route */
app.get('/_ping', function (req, res) {
  console.log('called ping');
  res.status(constants.httpStatusCodes.success).send('PONGg');
});

/** API routes */
var liveViewRoutes = require('./api/routes/liveViewRoutes');
var demoViewRoutes = require('./api/routes/demoViewRoutes');
var historicalViewRoutes = require('./api/routes/historicalViewRoutes');
var machineDetailsRoutes = require('./api/routes/machineDetailsRoutes');

liveViewRoutes(app);
demoViewRoutes(app);
historicalViewRoutes(app);
machineDetailsRoutes(app);

/** Start http server */
server.listen(port);

/** handle invalid url requets */
app.use(function (req, res, next) {
  if (req.method === 'OPTIONS') next();
  else {
    // logger.error("%s : Path not found : " + req.originalUrl, logStr);
    errorHandler('PageNotFound', res);
    console.log('Path not found.');
  }
});
