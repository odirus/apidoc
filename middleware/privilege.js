"use strict";

var _ = require('underscore');
var async = require('async');

//实现用户权限认证功能
module.exports = function (req, res, next) {
    //检查用户登录信息
    if (!_.isEmpty(req.cookies.user)) {
	req.isLogin = true;
	req.user = req.cookies.user;

	req.projects = [];
	req.projects.r = [];
	req.projects.rw = [];
	req.projects.admin = [];

	async.parallel([
	    function (cb) {
		req.db.Privilege.find(
		    {
			user_id: req.user.id,
			mode: 'rw'
		    }, function (err, rows) {
			if (err) {
			    return cb(err);
			} else {
			    rows.forEach(function(currVal, index) {
				req.projects.rw.push(currVal.id);
			    });
			    return cb();
			}
		    });
	    },
	    function (cb) {
		req.db.Project.find(
		    {
			admin_id: req.user.id
		    }, function (err, rows) {
			if (err) {
			    return cb(err);    
			} else {
			    rows.forEach(function (currVal, index) {
				req.projects.admin.push(currVal.id);
			    });
			    return cb();
			}
		    }
		);
	    }
	], function (err) {
	    if (err) {
		return next(err);
	    } else {
		return next();
	    }
	});
    } else {
	//目前只允许访问登录界面
	//@todo目前这个功能还需要更加灵活地进行控制
	var regStatic = new RegExp('^/static/');//静态资源部需要认证
	var regStaticBower = new RegExp('^/static-bower/');

	if (req.path !== '/api/auth' &&
	    req.path !== '/account/login' &&
	    !regStatic.test(req.path) &&
	    !regStaticBower.test(req.path)) {
	    return res.redirect('/account/login');
	} else {
	    req.isLogin = false;
	    return next();
	}
    }
};