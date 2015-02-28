"use strict";

var _ = require('underscore');
var serviceAuth = require('../service/auth');

module.exports.create = function (req, res, next) {
    var projectId = parseInt(req.params.projectId);
    var classId = req.body.classId || null;
    var contentType = req.body.contentType;
    var content = req.body.content;

    if(!serviceAuth.expectProjectRWPrivilege(req, res, projectId)) {
	return;
    }

    req.db.Document.create({
	class_id: classId,
	project_id: projectId,
	content_type: contentType,
	content: content
    }, function(err) {
	if (err) {
	    return next(err);
	} else {
	    return res.send('文档创建成功');
	}
    });
};

module.exports.update = function (req, res, next) {
    var documentId = parseInt(req.params.documentId);
    var classId = req.body.classId || null;
    var contentType = req.body.contentType;
    var content = req.body.content;

    req.db.Document.one({
	id: documentId
    }, function (err, row) {
	if (err) {
	    return next(err);
	}

	if (_.isEmpty(row)) {
	    return res.status(404).send('未找到相关文档信息');
	}
	if (!serviceAuth.expectProjectRWPrivilege(req, res, row.project_id)) {
	    return;
	} else {
	    row.class_id = classId;
	    row.content_type = contentType;
	    row.content = content;
	    row.save(function (err) {
		if (err) {
		    return next(err);
		} else {
		    return res.send('文档修改成功');
		}
	    });
	}
    });
};

module.exports.delete = function (req, res, next) {
    var documentId = req.params.documentId;

    req.db.Document.one({
	id: documentId
    }, function (err, row) {
	if (err) {
	    return next(err);
	}
	if (_.isEmpty(row)) {
	    return res.status(404).send('未找到相关的文档信息');
	} else {
	    if (!serviceAuth.expectProjectRWPrivilege(req, res, row.project_id)) {
		return;
	    } else {
		row.remove(function (err) {
		    if (err) {
			return next(err);
		    } else {
			return res.send('文档已经被成功删除');
		    }
		});
	    }
	}
    });
};