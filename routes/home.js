"use strict";

var homeControl = require('../controllers/home');

module.exports = function (router) {
    router.route('/')
	.get(homeControl.projects);

    return router;
};
