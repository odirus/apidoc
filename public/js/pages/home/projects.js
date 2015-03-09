define([
    'settings',
    'jquery',
    'bootstrap',
    'apps/validator/js/main'
    ], function (settings, $, bootstrap, validator) {
    //绑定点击事件
    var $newProjectButton = $('#new-project-button'),
	$newProjectBox = $('#new-project-box');

    //绑定点击新建项目事件
    $newProjectButton.click(function () {
	//使用验证输入插件
	$validator = $newProjectBox.find('input')
	    .validator(
	    [function (val) {return val ? true: false;}],
	    ['项目名称不能为空'],
	    [true]);
	//绑定新建项目事件
	$newProjectBox.find('button.submit-new-project').click(function () {
	    if ($validator.hasError()) {
		alert('请根据提示信息填写内容');
	    } else {
		createNewProject($, $newProjectBox.find('#project-name').val());
	    }
	});
	$newProjectBox.find('.modal').modal();
	$newProjectBox.on('hidden.bs.modal', function() {
	    $validator.rollback();
	    $newProjectBox.find('button.submit-new-project').unbind('click');
	});
    });


});

function createNewProject ($, projectName) {

}