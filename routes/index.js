"use strict";

var express = require('express');

var router = new express.Router({
    caseSensitive: true
});
var accountRoute = require('./account')(router);
var documentRoute = require('./document')(router);

module.exports = function (app) {
    app.use('/account', accountRoute);
    app.use('/document', documentRoute);
};