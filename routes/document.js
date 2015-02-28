"use strict";

var documentControl = require('../controllers/document');

module.exports = function (router) {
    router.route('/write')
	.get(documentControl.write);
    router.route('/read')
	.get(documentControl.read);

    return router;
};