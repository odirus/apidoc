"use strict";

var _ = require('underscore');
var serviceAuth = require('../service/auth');

module.exports.login = function (req, res, next) {
    var username = req.body.username;
    var hashPassword = req.body.password;

    req.db.User.one(
	{
	    username: username,
	    password: serviceAuth.hashPassword(hashPassword)
	},
	function (err, row) {
	    if (!_.isEmpty(row)) {
		serviceAuth.addLoginInfo(res, {
		    id: row.id,
		    username: row.username
		});
		return res.send('登录成功');
	    } else {
		return res.status(401).send('登录失败');
	    }
	});
};

module.exports.logout = function (req, res, next) {
    serviceAuth.deleteLoginInfo(res);
    return res.send('退出成功');
};