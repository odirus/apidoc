"use strict";

var orm = require('orm');

module.exports = function (orm, db) {
    db.Document= db
	.define('document', {
	    id: {type: 'serial', key: true},
	    class_id: {type: 'integer'},
	    p_class_id: {type: 'integer'},
	    class_level: {type: 'integer'},
	    project_id: {type: 'integer'},
	    content_type: ['markdown'],
	    content: {type: 'text'},
	    update_time: {type: 'date', time: true}
	},
	{
	    cache: false
	})
	.hasOne('class', db.Class, {
	    field: 'class_id'
	})
	.hasOne('pClass', db.Class, {
	    field:'p_class_id'
	})
	.hasOne('project', db.Project, {
	    field: 'project_id'
	});
};