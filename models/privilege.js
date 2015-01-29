"use strict";

var orm = require('orm');

module.exports = function (orm, db) {
    db.Privilege = db
	.define('privilege', {
	    id: {type: 'serial', key: true},
	    user_id: {type: 'integer'},
	    project_id: {type: 'integer'},
	    mode: ['r', 'rw']
	},
	{
	    cache: false
	})
	.hasOne('user', db.User, {
	    field: 'user_id'
	})
	.hasOne('project', db.Project, {
	    field: 'project_id'
	});
};