"use strict";

var orm = require('orm');

module.exports = function (orm, db) {
    db.Privilege = db.define('privilege', {
	    id: {type: 'serial', key: true},
	    user_id: {type: 'number'},
	    project_id: {type: 'number'},
	    mode: [1, 5]
	},
	{
	    cache: false
	});
};