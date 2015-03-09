"use strict";

var _ = require('underscore');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var middlewareLess = require('less-middleware');
var cookieSession = require('cookie-session');

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
    app.use(cookieSession({
	keys: [settings.session.key]
    }));
    app.use(cookieParser());
    //使用中间件的使用，注意挂载路径
    if (app.get('env') === 'development') {
	var lessOptions = {debug: true};
    }
    app.use('/public', middlewareLess(path.join(__dirname, '..', 'public'), lessOptions));
    app.use('/public', express.static(path.join(__dirname, '..', 'public')));
    app.use(middlewareDatabase);
    app.use(middlewarePrivilege);
};
