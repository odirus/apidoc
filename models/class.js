"use strict";

var orm = require('orm');

module.exports = function (orm, db) {
    db.Class = db
        .define('class',
	{
	    id: {type: 'serial', key: true},
	    name: {type: 'text'},
	    p_class_id: {type: 'integer'}
	},
        {
            cache: false,
	    validations: {
		name: orm.enforce.ranges.length(1, undefined)
	    }
        });
};