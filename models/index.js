"use strict";

var orm = require('orm');
var settings = require('../config/settings');

var connection = null;

function setup(db, cb) {
    require('./user')(orm, db);

    return cb(null, db);
}

module.exports = function (cb) {
    if (connection) {
	return cb(null, connection);
    }

    orm.connect(settings.database, function (err, db) {
	if (err) {
	    return cb(err);
	}
	connection = db;
	setup(db, cb);
    });
};