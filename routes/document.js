"use strict";

var documentControl = require('../controllers/document');

module.exports = function (router) {
    router.route('/write/:projectId')
	.get(documentControl.write);
    router.route('/read/:projectId/:documentId')
	.get(documentControl.read);

    return router;
};