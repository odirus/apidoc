define({
    //pageId标示页面编号,每次刷新后都会改变
    //$watchElement标示被监视的元素
    validate: function ($watchElement) {
	$watchElement.bind('blur', function (eventObj) {
	    var childNode;
	    var newClass;
	    var $curTarget = $(eventObj.currentTarget);
	    var curValue = $(eventObj.currentTarget).val();

	    if (!curValue) {
		childNode = '<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>';
		newClass = 'has-error has-feedback';
	    } else {
		childNode = '<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>';
		newClass = 'has-success has-feedback';
	    }
	    $curTarget.parent().addClass(newClass);
	    $curTarget.parent().append(childNode);
	});
    }
});