"use strict";

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var settings = require('./settings');
var middlewarePrivilege = require('../middleware/privilege');
var middlewareDatabase = require('../middleware/database');

module.exports = function (app, express) {
    app.set('env', (settings.debug ? 'development' : 'product'));
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');
    app.use(favicon(path.join(__dirname, '..', 'public', 'images', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(require('less-middleware')(path.join(__dirname, '..', 'public')));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(middlewareDatabase);
    app.use(middlewarePrivilege);
};