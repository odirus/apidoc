"use strict";

module.exports = {
    database: {
	host: process.env.OPENSHIFT_MYSQL_DB_HOST,
	database: 'apidoc',
	protocol: 'mysql',
	port: process.env.OPENSHIFT_MYSQL_DB_PORT,
	user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
	password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
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