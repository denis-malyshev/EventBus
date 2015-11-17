function ChatUser(name) {
	this._name=name;
	this.id=name+"id";
	return {
		"getName": function() {
			return name;
		}
	};
};

function ChatUserService() {
	return {
		"onMessage": function(eventBus, sender, textMessgae) {
			eventBus.postMessage("MESSAGE_ADDED",textMessgae);
		}
	};
}

var ChatUserComponent=function(divId,chatUser,eventBus) {
	var selector="#"+divId;
	var textAreaId=chatUser.id;
	$(selector).html(chatUser.getName()+':<input type="textarea" id="'+textAreaId+'" value="">'
			+'<input type="button" id="btn1" value="send">');
	$("#btn1").click(function() {
		var text=$("#"+textAreaId).val();		
		ChatUserService().onMessage(eventBus,chatUser,text);
		$("#"+textAreaId).val("");
	})
}

