define(['jquery', 'bootstrap', 'util', 'apps/validator/js/main'], function ($, bootstrap, util, validator) {
    "use strict";

    //初始化编辑器
    (function () {
	var converter1 = Markdown.getSanitizingConverter();
	var editor1 = new Markdown.Editor(converter1);
	editor1.run();
    })();

    $('#new-document').find('.project-name').validator(
	[function (val) {return val ? true : false;}],
	['文档不能缺少标题哦'],
	[true]);
});