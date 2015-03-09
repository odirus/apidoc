define(['jquery', 'underscore'], function ($, _) {
    return {
	genGuid: function () {
	    function guid() {
		function s4() {
		    return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
	    }
	    return guid();
	},
	addStyle: function (id, stl) {
	    return (function (id, stl) {
		$('head').append("<style id=" + id + " type='text/css' rel='stylesheet'>" + _.template(stl)() + "</style>");

		return (function () {
		    var removeDom = function (id) {
			$('#' + id).remove();
		    };
		    return _.partial(removeDom, id);
		}
		)();
	    })(id, stl);
	}
    };
});