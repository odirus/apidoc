"use strict";

var _ = require('underscore');
var crypto = require('crypto');
var settings = require('../config/settings');

module.exports.addLoginInfo = function (res, userInfo) {
    setCookie(res, 'user', userInfo);
};

module.exports.deleteLoginInfo = function (res) {
    res.clearCookie('user');
};

function setCookie(res, name, value, options) {
    options = options || {};
    options = _.extend(options, {maxAge: settings.cookie.expireTime * 1000});
    res.cookie(name, value, options);
}

module.exports.hashPassword = function (hashPassword) {
    return crypto.createHash('md5').update(hashPassword + hashPassword).digest('hex');
};

//需要登录用户才能继续访问
module.exports.expectLogin = function (req, res) {
    if (!req.isLoegin) {
	res.status(401).send('用户未登录');
	//停止执行
	return false;
    } else {
	//继续执行
	return true;
    }
};

//需要用户拥有对该项目的读写权限
module.exports.expectProjectRWPrivilege = function (req, res, projectId) {
    if (_.indexOf(req.projects.rw, projectId) === -1) {
	res.status(401).send('需要读写权限');
	return false;
    } else {
	return true;
    }
};

//需要用户拥有对该项目的读权限
module.exports.expectProjectRPrivilege = function (req, res, projectId) {
    if (_.indexOf(req.projects.r, projectId) === -1) {
	res.status(401).send('需要读权限');
	return false;
    } else {
	return true;
    }
};

//需要用户是该项目的所有者
module.exports.expectProjectOwnerPrivilege = function (req, res, projectId) {
    if (_.indexOf(req.projects.admin, projectId) === -1) {
	res.status(401).send('需要项目创建者权限');
	return false;
    } else {
	return true;
    }
};