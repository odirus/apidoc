"use strict";

var crypto = require('crypto');

module.exports.hashPassword = function (password) {
    return crypto.createHash('md5').update(password).digest('hex');
};