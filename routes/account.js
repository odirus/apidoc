"use strict";

var accountControl = require('../controllers/account');

module.exports = function (router) {
    router.route('/login')
	.get(accountControl.login);

    return router;
};