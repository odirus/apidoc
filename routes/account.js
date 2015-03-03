"use strict";

var accountControl = require('../controllers/account');

module.exports = function (router) {
    router.route('/login')
	.get(accountControl.login);
    router.route('/dologin')
	.post(accountControl.doLogin);
    router.route('/dologout')
	.post(accountControl.doLogout);

    return router;
};