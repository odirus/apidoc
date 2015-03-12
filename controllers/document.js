"use strict";

var _ = require('underscore');
var serviceAuth = require('../service/auth');

module.exports.write = function (req, res, next) {
    var projectId = parseInt(req.params['projectId']);

    //检查用户权限
    if (!serviceAuth.expectProjectRWPrivilege(req, res, projectId)) {
	return;
    }

    //获取项目信息
    req.db.Project.one({'id': projectId}, function (err, project) {
	if (err) {
	    return next(err);
	}
	if (_.isEmpty(project)) {
	    return next();
	} else {
	    return res.render('document/write', {
		pageName: 'document/write',
		projectName: project.name,
		projectId: project.id
	    });
	}
    });
};

module.exports.read = function (req, res, next) {

};