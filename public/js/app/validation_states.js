define(['util', 'app/message_box'], function (util, msgBox) {
    var nodeList = [],//新加入节点编号列表
	cbList = [],//需要执行的回调函数列表
	errorNode = 0;//当前验证失败的节点
    var init = function () {
	nodeList = [];
	cbList = [];
	errorNode = 0;
    };

    return {
	//$watchElement标示被监视的input控件元素
	validateInput: function ($watchElement) {
	    var changeClass = function ($parentNode, $node, curValue) {
		if (curValue) {
		    $parentNode.hasClass('has-error')
			? $parentNode.removeClass('has-error').addClass('has-feedback has-success')
			: $parentNode.addClass('has-feedback has-success');
		    $node.hasClass('glyphicon-remove')
			? $node.removeClass('glyphicon-remove').addClass('glyphicon-ok')
			: $node.addClass('glyphicon-ok');
		    errorNode > 0 ? errorNode-- : null;
		} else {
		    $parentNode.hasClass('has-success')
			? $parentNode.removeClass('has-success').addClass('has-feedback has-error')
			: $parentNode.addClass('has-feedback has-error');
		    $node.hasClass('glyphicon-ok')
			? $node.removeClass('glyphicon-ok').addClass('glyphicon-remove')
			: $node.addClass('glyphicon-remove');
		    errorNode++;
		}
	    };

	    $watchElement.bind('focus', function (eventObj) {
		console.log('focus');


		var $curTarget = $(eventObj.currentTarget),
		    $parentTarget = $curTarget.parent(),
		    curValue = $curTarget.val();

		if (!$curTarget.is(':last-child')) {
		    changeClass($parentTarget, $parentTarget.find('span').last(), true);
		} else {
		    var randomId = util.genGuid(),
			$newNode = $('<span id="' + randomId + '" class="glyphicon form-control-feedback" aria-hidden="true"></span>');
		    changeClass($parentTarget, $newNode, true);
		    $parentTarget.append($newNode);
		    cbList.push(
			function ($parentTarget) {
			    return function () {
				$parentTarget.removeClass('has-success has-error');
			    }
			}($parentTarget)
		    );
		    nodeList.push(randomId);
		}
	    });
	    $watchElement.bind('blur', function (eventObj) {
		var $curTarget = $(eventObj.currentTarget),
		    $parentTarget = $curTarget.parent(),
		    curValue = $curTarget.val();

		changeClass($parentTarget, $parentTarget.find('span').last(), curValue);
	    });
	},
	//提交之前的验证
	validateSubmit: function ($watchElement, $msgBoxNode, $msgParentNode, className) {
	    $watchElement.submit(function (e) {
		if (errorNode > 0) {
		    e.preventDefault();
		    msgBox.updateMsg($msgParentNode, '请填写必要信息')
			.showBox($msgBoxNode, className);
		}
	    });
	},
	//移除所有的验证提示
	removeAll: function () {
	    nodeList.forEach(function (curNodeId, index) {
		$('#' + curNodeId).remove();
	    });
	    cbList.forEach(function (curCb) {
		curCb.call(this);
		curCb = null;
	    });
	    init();
	}
    }
});