"use strict";

var orm = require('orm');

module.exports = function (orm, db) {
    db.Document= db.define('document', {
	    id: {type: 'serial', key: true},
	    class_id: {type: 'number'},
	    p_class_id: {type: 'number'},
	    class_level: {type: 'number'},
	    project_id: {type: 'text'},
	    content_type: ['markdown'],
	    content: {type: 'text'},
	    update_time: {type: 'date'}
	},
	{
	    cache: false
	});
};