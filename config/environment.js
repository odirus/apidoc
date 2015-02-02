"use strict";

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var RedisSessions = require('redis-sessions');

var settings = require('./settings');

var rs = new RedisSessions(settings.redis);
var models = require('../models');

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
    app.use(function (req, res, next) {
	models(function (err, db) {
	    if (err) {
		return next(err);
	    }

	    req.models = db.models;
	    req.db = db;

	    return next();
	});
    });
};