define([
    'jquery',
    'underscore',
    'util',
    'text!../template/common.tpl',
    'text!../css/common.css'
], function ($, _, util, tpl, stl) {
    "use strict";

    function Notify ($parent, insertFunc, type, options) {
	this.el = null;

	if (type === 'common') {
	    this.el =  $(_.template(tpl)(options));
	    this.el.hide();
	    $parent[insertFunc](this.el);
	    $('head').append("<style type='text/css' rel='stylesheet'>" + _.template(stl)(options) + "</style>");
	} else {
	    return new Error('Check type');
	}
    }
    Notify.prototype.update = function (message) {
	this.el.find('span.content').text(message);
	return this.el;
    };

    $.fn.notify = function (insertFunc, type, options) {
	var defaults = {
	    id: util.genGuid(),
	    content: '这里是提示信息'
	};

	if (!_.isFunction(insertFunc)) {
	    insertFunc = 'append';
	}
	if (_.isEmpty(options)) {
	    options = defaults;
	} else {
	    options = _.extend(defaults, options);
	}
	return new Notify($(this), insertFunc, type, options);
    };
    $.fn.notify.Constructor = Notify;
});
