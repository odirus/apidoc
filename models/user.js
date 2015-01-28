"use strict";

module.exports = function (orm, db) {
    db.User = db.define('user', {
	    id: {type: 'serial', key: true},
	    username: {type: 'text', size: 128},
	    password: {type: 'text', size: 32}
	},
	{
	    cache: false
	});
};