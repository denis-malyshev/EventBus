function ChatUser(name) {
	this.name=name;
	this.textAreaId=name+"id";
	this.btnId=name+"btnId";
};

function ChatUserService() {
	return {
		"onMessage": function(eventBus, sender, textMessage) {
			eventBus.postMessage("MESSAGE_ADDED",new Message(sender.name,textMessage));
		}
	};
}

var ChatUserComponent=function(divId,chatUser,eventBus) {
	var selector="#"+divId;
	var textAreaId=chatUser.textAreaId;
	var btnId=chatUser.btnId;
	$(selector).html(chatUser.name+':<input type="textarea" id="'+textAreaId+'" value="">'
			+'<input type="button" id="'+btnId+'" value="send">');
	$("#"+btnId).click(function() {
		var text=$("#"+textAreaId).val();
		if(text!="") {
			ChatUserService().onMessage(eventBus,chatUser,text);
			$("#"+textAreaId).val("");
		}
	})
}

