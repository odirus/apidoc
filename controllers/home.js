"use strict";

var _ = require('underscore');

//展示自己所有的项目
module.exports.projects = function (req, res, next) {
    var projectsList = _.union(
	    req.session.projects.r,
	    req.session.projects.rw,
	    req.session.projects.admin
	),
	projectsListR = req.session.projects.r,
	projectsListRW = req.session.projects.rw,
	projectsListAdmin = req.session.projects.admin;


    req.db.Project.find({id: projectsList}, function (err, rows) {
	if (err) {
	    return next(err);
	} else {
	    projectsList = [];
	    rows.forEach(function (curValue, index) {
		var rPrivi = false,
		    rwPrivi = false,
		    adminPrivi = false;

		if (projectsListR.indexOf(curValue.id) > -1) {
		    rPrivi = true;
		}
		if (projectsListRW.indexOf(curValue.id) > -1) {
		    rPrivi = true;
		    rwPrivi = true;
		}
		if (projectsListAdmin.indexOf(curValue.id) > -1) {
		    adminPrivi = true;
		}
		projectsList.push({
		    id: curValue.id,
		    name: curValue.name,
		    rPrivi: rPrivi,
		    rwPrivi: rwPrivi,
		    adminPrivi: adminPrivi
		});
	    });
	    if (_.isEmpty(projectsList)) {
		projectsList = null;
	    }
	}
	res.render('home/projects', {
	    pageName: 'home/projects',
	    projectsList: projectsList
	});
    });
};
