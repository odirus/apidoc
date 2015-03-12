define(['jquery', 'bootstrap', 'util', 'underscore','apps/validator/js/main'], function ($, bootstrap, util, _, validator) {
    "use strict";

    //初始化编辑器
    (function () {
	var converter1 = Markdown.getSanitizingConverter();
	var editor1 = new Markdown.Editor(converter1);
	editor1.run();
    })();

    var $newDocumentDom = $('#new-document');

    //绑定错误时间处理
    $newDocumentDom.find('.project-name').validator(
	[function (val) {return val ? true : false;}],
	['文档不能缺少标题哦'],
	[true]);
    
    $('#create-new-document').click(function () {
	var projectId,
	    documentTitle,
	    documentContentType = 'markdown',
	    documentContent;

	if (_.isEmpty(window.apidoc.project.id)) {
	    return alert('页面异常');
	} else {
	    projectId = window.apidoc.project.id;
	}
	documentTitle = $newDocumentDom.find('input.document-title').val();
	documentContent = $newDocumentDom.find('textarea.document-content').val();
	createNewDocument(projectId, documentTitle, documentContentType, documentContent);
    });
});

function createNewDocument(projectId, title, contentType, content) {
    $.ajax({
	type: 'POST',
	url: '/api/document/' + projectId,
	data: {
	    title: title,
	    contentType: contentType,
	    content: content
	},
	success: function () {
	    alert('创建成功');
	},
	error: function () {
	    alert('出现错误');
	}
    });
}