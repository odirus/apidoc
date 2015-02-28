"use strict";

var models = require('../models');

//挂载数据库设置
module.exports = function (req, res, next) {
    models(function (err, db) {
	if (err) {
	    return next(err);
	}

	req.models = db.models;
	req.db = db;

	return next();
    });
};