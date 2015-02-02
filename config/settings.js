"use strict";

module.exports = {
    debug: true,
    database: {
	host: '192.168.11.11',
	database: 'apidoc',
	protocol: 'mysql',
	port: '3306',
	user: 'test',
	password: 'test',
	query: {pool: true}
    },
    redis: {
	app: 'apidoc',
	host: '192.168.11.11',
	port: '6379',
	namespace: 'apidoc',
	wipe: 600,
	options: {
	    auth_pass: '335577'
	}
    }
};