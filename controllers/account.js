"use strict";

var _ = require('underscore');
var settings = require('../config/settings');
var serviceAuth = require('../service/auth');

module.exports.login = function (req, res, next) {
    if (req.session.user) {
	return res.redirect(settings.routes.homePage);
    } else {
	return res.render(settings.routes.loginPage);
    }
};

module.exports.doLogin = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    req.db.User.one(
	{
	    username: username,
	    password: serviceAuth.hashPassword(serviceAuth.hashPassword(password) + serviceAuth.hashPassword(password))
	},
	function (err, row) {
	    if (!_.isEmpty(row)) {
		serviceAuth.addLoginInfo(req, res, {
		    id: row.id,
		    username: row.username
		});
		return res.redirect(settings.routes.homePage);
	    } else {
		req.session.message.type = 'error';
		req.session.message.content = '用户名或密码错误';
		return res.redirect(settings.routes.loginPage);
	    }
	});
};

module.exports.doLogout = function (req, res, next) {
    serviceAuth.deleteLoginInfo(res);
};