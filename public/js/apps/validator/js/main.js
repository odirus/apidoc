define([
    'jquery',
    'util',
    'underscore',
    'text!../template/input.tpl',
    'text!../css/input.css'
], function ($, util, _, tpl, stl) {
    "use strict";

    var rollbackCbList = [];

    function Validator ($inputNodes, validateCbList, messageList, needList) {
	this.$nodes = $inputNodes;
	this.needList = needList;

	$.each($inputNodes, function (index, node) {
	    var $inputNode = $(node);

	    $inputNode.on('blur', function () {
		var message = '参数信息不正确';

		if (_.isString(messageList[index])) {
		    message = messageList[index];
		}
		if (_.isFunction(validateCbList[index])) {
		    if (!validateCbList[index].call($inputNode, $inputNode.val())) {
			var id = util.genGuid(),
			    $message = $(_.template(tpl)({
				'id': id,
				'content': message
			    }));
			$message.addClass('alert-danger');
			if ($inputNode.next().hasClass('app-validator-input')) {
			    $inputNode.next().replaceWith($message);
			} else {
			    $inputNode.after($message);
			}
			//添加回收任务
			rollbackCbList.push(
			    (function (id) {
				var removeDom = function (id) {
				    $('#' + id).remove();
				};
				return _.partial(removeDom, id);
			    })(id)
			);
			//添加回收任务
			if (!$inputNode.parent().hasClass('has-error')) {
			    $inputNode.parent().addClass('has-error');
			}
			rollbackCbList.push(
			    (function ($node) {
				var removeStyle = function ($node) {
				    $node.removeClass('has-error');
				};
				return _.partial(removeStyle, $node);
			    })($inputNode.parent())
			);
		    }
		}
	    });
	    $inputNode.on('focus', function () {
		if ($inputNode.parent().hasClass('has-error')) {
		    $inputNode.removeClass('alert-error');
		    $inputNode.parent().removeClass('has-error');
		}
		if (!_.isEmpty($inputNode.next()) && $inputNode.next().hasClass('app-validator-input')) {
		    $inputNode.next().remove();
		}
	    });
	});
    }

    //判断是否有错误
    Validator.prototype.hasError = function () {
	var that = this,
	    hasError = false;

	$.each(that.$nodes, function (index, val) {
	    //判断是否为最低参数要求
	    if (that.needList[index] && _.isEmpty($(val).val())) {
		hasError = true;
	    }
            //判断填写的值是否符合要求
	    if ($(val).parent().hasClass('has-error')) {
		hasError = true;
	    }
	});
	return hasError;
    };
    //回滚到初始状态
    Validator.prototype.rollback = function () {
	$.each(rollbackCbList, function (index, func) {
	    if (_.isFunction(func)) {
		func.call(this);
	    }
	});
	$.each(this.$nodes, function (index, val) {
	    $(val).val('');
	});
	rollbackCbList = [];
    };
    
    //validateCbList 待验证输入框的判定函数
    $.fn.validator = function (validateCbList, messageList, needList) {
	if (!_.isArray(validateCbList) || !_.isArray(needList)) {
	    return new Error('Check param type');
	}

	rollbackCbList.push(util.addStyle(util.genGuid(), stl));

	return new Validator($(this), validateCbList, messageList, needList);
    };
    $.fn.Constructor = Validator;
});