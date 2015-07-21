"use strict";

var fs = require("fs");
var path = require("path");
var morgan = require("morgan");
var express = require("express");
var winston = require("winston");
var config = require("./config.js");
var exphbs = require('express-handlebars');
var env = process.env.NODE_ENV || "development";
var pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json")));

module.exports = function (app) {

	app.use(express.static(path.join(__dirname, '../public')));

	// Use winston on production
  var log;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }

  if (env !== 'test') app.use(morgan(log));
  
  var hbs = exphbs({
    defaultLayout: 'main', 
    extname: '.hbs'
  });

	app.engine('.hbs', hbs);
	app.set('view engine', '.hbs');

};