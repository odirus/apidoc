"use strict";

var express = require('express');

var router = new express.Router({
    caseSensitive: true
});
var accountRoute = require('./account')(router);

module.exports = function (app) {
    app.use('/account', accountRoute);
};