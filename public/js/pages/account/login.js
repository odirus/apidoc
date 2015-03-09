define(['jquery', 'apps/notify/js/main'], function ($, Notify) {
    "use strict";

    var $containerBox = $('#container-box'),
	$loginBox = $('#login-box'),
	$regBox = $('#reg-box'),
	displaySwitchClass = 'display-switch';

    var toggleClass = function () {
	$loginBox.toggleClass(displaySwitchClass);
	$regBox.toggleClass(displaySwitchClass);
    };

    //初始化界面程序
    $loginBox.removeClass(displaySwitchClass);
    //代理点击事件
    $containerBox.delegate('button.toggle-box', 'click', toggleClass);
    //生成提示信息
    var $notify = $loginBox.notify('append', 'common', {
	'id': 'notify-box'
    });
});
