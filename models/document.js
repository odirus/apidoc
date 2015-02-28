"use strict";

var orm = require('orm');

module.exports = function (orm, db) {
    db.Document= db
	.define('document', {
	    id: {type: 'serial', key: true},
	    class_id: {type: 'integer'},
	    project_id: {type: 'integer'},
	    content_type: ['markdown'],
	    content: {type: 'text'},
	    update_time: {type: 'date', time: true}
	},
	{
	    cache: false,
	    validations : {
		project_id: orm.enforce.ranges.number(1, undefined),
		content_type : orm.enforce.lists.inside(['markdown']),
		content: orm.enforce.ranges.length(1, undefined)
	    }
	})
	.hasOne('class', db.Class, {
	    field: 'class_id'
	})
	.hasOne('project', db.Project, {
	    field: 'project_id'
	});
};