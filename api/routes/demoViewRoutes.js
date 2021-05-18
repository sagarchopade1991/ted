const demoViewController = require('../controller/demoViewController');
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');
const express = require('express');
const router = express.Router();

module.exports = function (app) {
  app.post('/uploadImg', uploadStrategy, demoViewController.upload);
};
