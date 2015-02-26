"use strict";

module.exports.write = function (req, res, next) {
    return res.send('write document page');
};

module.exports.read = function (req, res, next) {
    return res.send('read document page');
};