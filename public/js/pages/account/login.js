require(['../../common'], function (common, $) {
    require(['jquery'], function ($) {
	require(['app/validation_states', 'app/message_box'], function (validation, msgBox) {
	    //页面初始化
	    var $loginBox = $('#login-box'),
		$regBox = $('#reg-box'),
		$msgBox = $('#msg-box');

	    //根据提示内容确定是否需要显示
	    if (msgBox.initPageError($msgBox.find('.notice-message'))) {
		msgBox.showBox($msgBox, 'display-switch');
	    }

	    //获取页面hash并初始化页面
	    var pageHash = $('#pageHash').text().trim();
	    if (pageHash === 'reg') {
		$regBox.toggleClass('display-switch');
	    } else {
		$loginBox.toggleClass('display-switch');
	    }

	    //绑定验证事件
	    validation.validateInput($loginBox.find('input.form-control'));
	    validation.validateInput($regBox.find('input.form-control'));
	    validation.validateSubmit(
		$loginBox.find('form'),
		$msgBox,
		$msgBox.find('.notice-message'),
		'display-switch');
	    validation.validateSubmit(
		$regBox.find('form'),
		$msgBox,
		$msgBox.find('.notice-message'),
		'display-switch'
	    );

	    //绑定切换事件
	    $($loginBox.find('button')).click(function () {
		validation.removeAll();
		msgBox.hideBox($msgBox, 'display-switch');
		$loginBox.toggleClass('display-switch');
		$regBox.toggleClass('display-switch');
	    });
	    $($regBox.find('button')).click(function () {
		validation.removeAll();
		msgBox.hideBox($msgBox, 'display-switch');
		$regBox.toggleClass('display-switch');
		$loginBox.toggleClass('display-switch');
	    });
	});
    });
});