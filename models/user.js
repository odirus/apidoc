"use strict";

module.exports = function (orm, db) {
    db.User = db.define('user', {
	    id: {type: 'serial', key: true},
	    username: {type: 'text', size: 128},
	    password: {type: 'text', size: 32}
	},
	{
	    cache: false,
	    validations: {
		username: orm.enforce.ranges.length(1, undefined),
		password: orm.enforce.ranges.length(32, 32)
	    }
	});
};