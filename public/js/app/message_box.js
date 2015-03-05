define(['util'], function () {
    return {
	//显示消息窗体
	initPageError: function ($msgParentNode) {
	    if ($msgParentNode.text().trim()) {
		return true;//需要显示页面错误
	    } else {
		return false;//不需要显示页面错误
	    }
	},
	showBox: function ($box, className) {
	    $box.removeClass(className);
	    return this;
	},
	hideBox: function ($box, className) {
	    $box.addClass(className);
	    return this;
	},
	updateMsg: function ($msgParentNode, newMsg) {
	    $msgParentNode.text(newMsg);
	    return this;
	}
    };
});