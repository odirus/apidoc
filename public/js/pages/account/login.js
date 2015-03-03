require(['../../common'], function (common, $) {
    require(['jquery'], function ($) {
	require(['app' + '/validation_states'], function (validation) {
	    validation.validate($('#login-box input.form-control'));
	});
    });
});