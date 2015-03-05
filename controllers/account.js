"use strict";

var _ = require('underscore');
var settings = require('../config/settings');
var serviceAuth = require('../service/auth');

var pageHashCollection = {
    loginPage: {
	login: 'login',
	reg: 'reg'
    }
};

//用户登录
module.exports.login = function (req, res, next) {
    var pageHash;
    var options = {};

    if (req.session.user) {
	return res.redirect(settings.routes.homePage);
    } else {
	return res.render(settings.routes.loginPage, options);
    }
};

//用户登录
module.exports.doLogin = function (req, res, next) {
    var username = req.body.loginUsername;
    var password = req.body.loginPassword;

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

//用户注销
module.exports.doLogout = function (req, res, next) {
    serviceAuth.deleteLoginInfo(res);
};

//用户注册
module.exports.doReg = function (req, res, next) {
    var username = req.body.regUsername;
    var password = req.body.regPassword;

    req.db.User.create({
	username: username,
	password: serviceAuth.hashPassword(serviceAuth.hashPassword(password) + serviceAuth.hashPassword(password))
    }, function (err, user) {
	if (err && typeof err.code !== 'undefined' &&
	    err.code === 'ER_DUP_ENTRY') {
	    req.session.message.type = serviceAuth.messageErrorType;
	    req.session.message.content = '用户名已经被注册';
	    serviceAuth.addPageHash(req, res, pageHashCollection.loginPage.reg);
	    return res.redirect(settings.routes.loginPage);
	}

	if (err) {
	    return next(err);
	} else {
	    serviceAuth.addLoginInfo(req, res, {
		id: user.id,
		username: user.username
	    });
	    return res.redirect(settings.routes.homePage);
	}
    });
};