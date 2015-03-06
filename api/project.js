"use strict";

var _ = require('underscore');
var async = require('async');
var serviceAuth = require('../service/auth');

module.exports.create = function (req, res, next) {
    var projectName = req.body.projectName;

    req.db.transaction(function (err, t) {
	async.waterfall([
	    function (cb) {
		req.db.Project.create({
		    admin_id: req.session.user.id,
		    name: projectName
		}, function(err, row) {
		    if (err) {
			return cb(err);
		    } else {
			return cb(null, row);
		    }
		});
	    },
	    function (projectRow, cb) {
		req.db.Privilege.create({
		    user_id: req.session.user.id,
		    project_id: projectRow.id,
		    mode: 'rw'
		}, function (err) {
		    if (err) {
			return cb(err);
		    } else {
			return cb(null);
		    }
		});
	    }
	], function (err) {
	    if (err) {
		t.rollback(function (dbError) {
		    if (dbError) {
			return next(dbError);
		    } else {
			return next(err);
		    }
		});

	    } else {
		t.commit(function (dbError) {
		    if (dbError) {
			return next(dbError);
		    } else {
			return res.send('项目创建成功');
		    }
		});
	    }
	});
    });
};

module.exports.update = function (req, res, next) {
    var projectId = parseInt(req.params.projectId);
    var projectName = req.body.projectName;

    req.db.Project.one({id: projectId}, function (err, row) {
	if (err) {
	    return next(err);
	}
	if (_.isEmpty(row)) {
	    return res.status(404).send('未找到指定的项目');
	} else {
	    row.name = projectName;
	    row.save(function (err) {
		if (err) {
		    return next(err);
		} else {
		    return res.send('项目修改成功');
		}
	    });	    
	}
    });
};

module.exports.delete = function (req, res, next) {
    var projectId = parseInt(req.params.projectId);

    if (!serviceAuth.expectProjectOwnerPrivilege(req, res, projectId)) {
	return;
    }

    req.db.Project.one({id: projectId}, function (err, row) {
	if (err) {
	    return next(err);
	}
	if (_.isEmpty(row)) {
	    return res.status(404).send('未找到该项目');
	}
	//删除项目信息和权限信息
	req.db.transaction(function (err, t) {
	    async.parallel([
		function (cb) {
		   row.remove(function (err) {
		       if (err) {
			   return cb(err);
		       } else {
			   return cb(null);
		       }
		   });
		},
		function (cb) {
		    req.db
			.Privilege
			.find({project_id: projectId})
			.remove(function (err) {
			    if (err) {
				return cb(err);
			    } else {
				return cb(null);
			    }
			});
		}
	    ], function (err) {
		if (err) {
		    t.rollback(function (dbError) {
			if (dbError) {
			    return next(dbError);
			} else {
			    return next(err);
			}
		    });
		} else {
		    t.commit(function (tErr) {
			if (tErr) {
			    return next(tErr);
			} else {
			    return res.send('已经删除该项目');
			}
		    });
		}
	    });
	});
    });
};