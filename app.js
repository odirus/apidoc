"use strict";

var express = require('express');
var app = express();

var environment = require('./config/environment');
var routes = require('./routes/');

environment(app, express);
routes(app);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);

        res.render('public/error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('public/error', {
        message: err.message || 'error',
        error: {}
    });
});

module.exports = app;