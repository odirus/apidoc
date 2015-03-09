requirejs.config({
    baseUrl: '/public',
    paths: {
	apps: 'js/apps',
	util: 'js/helper/util',
	text: 'js/libs/text',
	jquery: 'js/libs/jquery',
	backbone: 'js/libs/backbone',
	bootstrap: 'js/libs/bootstrap',
	underscore: 'js/libs/underscore',
	settings: 'js/settings'
    },
    shim: {
	'underscore': {
	    exports: '_'
	},
	'backbone': {
	    deps: ['underscore'],
	    exports: '_'
	},
	'bootstrap': {
	    deps: ['jquery'],
	    exports: 'bootstrap'
	}
    }
});

define(['jquery'], function ($) {
    if (window.apidoc && "pageName" in window.apidoc) {
	require(['js/pages/' + window.apidoc.pageName]);
    }
});