"use strict";

var path = require('path');

module.exports = {
    debug: true,
    session: {
	key: 'apidoc'
    },
    cookie: {
	expireTime: 3600//单位秒
    },
    database: {
	host: '192.168.11.11',
	database: 'apidoc',
	protocol: 'mysql',
	port: '3306',
	user: 'test',
	password: 'test',
	custom_methods: {
	    add_settings: function (orm) {
		orm.settings.set("connection.reconnect", true);
	    }
	}
	//query: {pool: false}//暂时需要关闭该选项,事务组件不支持,等我前去解决
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
    },
    methods: {
	getAppPath: function () {
	    return path.dirname(__dirname);
	}
    },
    routes: {
	homePage: '/',
	loginPage: 'account/login'
    }
};
