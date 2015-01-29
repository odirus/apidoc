"use strict";

var orm = require('orm');

module.exports = function (orm, db) {
    db.Class= db
	.define('class', {
	    id: {type: 'serial', key: true},
	    name: {type: 'text'}
	},
	{
	    cache: false
	});
};