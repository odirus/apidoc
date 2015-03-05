"use strict";

var _ = require('underscore');
var async = require('async');
var serviceAuth = require('../service/auth');

var messageDefaultType = 'common';
var messageErrorType = 'error';

//实现用户权限认证功能
module.exports = function (req, res, next) {
    //初始化返回提示信息
    if (req.session === null ||
	!req.session.message ||
	typeof req.session.pageHash === 'undefined') {
	req.session = {
	    //默认消息类型
	    message: {
		type: messageDefaultType,
		content: null
	    },
	    pageHash: null
	};
    }

    //自定义返回
    selfRes(req, res, next);

    //检查用户登录信息
    if (!_.isEmpty(req.session.user)) {
	req.session.projects = [];
	req.session.projects.r = [];
	req.session.projects.rw = [];
	req.session.projects.admin = [];

	async.parallel([
	    function (cb) {
		req.db.Privilege.find(
		    {
			user_id: req.session.user.id
		    }, function (err, rows) {
			if (err) {
			    return cb(err);
			} else {
			    rows.forEach(function(currVal, index) {
				if (currVal.mode === 'rw') {
				    req.session.projects.rw.push(currVal.id);
				} else if (currVal.mode === 'r') {
				    req.session.projects.r.push(currVal.id);
				}
			    });
			    return cb();
			}
		    });
	    },
	    function (cb) {
		req.db.Project.find(
		    {
			admin_id: req.session.user.id
		    }, function (err, rows) {
			if (err) {
			    return cb(err);    
			} else {
			    rows.forEach(function (currVal, index) {
				req.session.projects.admin.push(currVal.id);
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
	return privilegeControl(req, res, next);
    }
};

//返回时添加操作
function selfRes (req, res, next) {
    var _render = res.render;

    res.render = function (view, options, fn) {
	var pageHash;
	var messageType;
	var messageContent;
	options = options || {};

	if (req.session !== null &&
	    req.session.message &&
	    req.session.message.content) {
	    messageType = req.session.message.type;
	    messageContent = req.session.message.content;
	    req.session.message.type = messageDefaultType;
	    req.session.message.content = null;
	}
	if (serviceAuth.getPageHash(req, res)) {
	    pageHash = serviceAuth.getPageHash(req, res);
	    serviceAuth.deletePageHash(req, res);
	}
	options = _.extend(options, {
	    pageHash: pageHash,
	    messageType: messageType,
	    messageContent: messageContent
	});

	_render.call(this, view, options, fn);
    };
}

//定义路径权限控制
function privilegeControl (req, res, next) {
    var regStatic = new RegExp('^/static/');

    if (req.path !== '/api/auth' &&
	req.path !== '/account/login' &&
	req.path !== '/account/dologin' &&
	req.path !== '/account/doreg' &&
	!regStatic.test(req.path)) {
	return res.redirect('/account/login');
    } else {
	return next();
    }
}
