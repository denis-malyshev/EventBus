function ChatUser(name) {
	var _name=name;

	return {
		"getName": function() {
			return _name;
		}
	};
}

function ChatUserService() {
	return {
		"onMessage": function(eventBus, sender, textMessgae) {
			eventBus.postMessage("MESSAGE_ADDED",new Message(sender, textMessgae));	
		}
	};
}

var ChatUserComponent=function(divId,chatUser,eventBus) {
	var selector="#"+divId;
	$(selector).html(chatUser.getName()+':<input type="textarea" id="area" value="">'
			+'<input type="button" id="btn1" value="send">');
	$("#btn1").click(function() {
		var text=$("#area").val();
		$("#chatarea").val(text);
		//ChatUserService().onMessage(eventBus,chatUser,text);
	})
}

