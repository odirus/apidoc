"use strict";

var orm = require('orm');

module.exports = function (orm, db) {
    db.Project = db.define('project', {
	    id: {type: 'serial', key: true},
	    name: {type: 'text', size: 128},
	    admin_id: {type: 'number'}
	},
	{
	    cache: false
	});
};