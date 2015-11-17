function ChatUser(name) {
	this.name=name;
	this.textAreaId=name+"id";
	this.btnId=name+"btnId";
};
ChatUser.prototype.getBtnId=function() {
	return this.btnId;
}
ChatUser.prototype.getName=function() {
	return this.name;
}
ChatUser.prototype.getTextAreaId=function() {
	return this.textAreaId;
}

function ChatUserService() {
	return {
		"onMessage": function(eventBus, sender, textMessage) {
			eventBus.postMessage("MESSAGE_ADDED",new Message(sender.getName(),textMessage));
		}
	};
}

var ChatUserComponent=function(divId,chatUser,eventBus) {
	var selector="#"+divId;
	var textAreaId=chatUser.getTextAreaId();
	var btnId=chatUser.getBtnId();
	$(selector).html(chatUser.getName()+':<input type="textarea" id="'+textAreaId+'" value="">'
			+'<input type="button" id="'+btnId+'" value="send">');
	$("#"+btnId).click(function() {
		var text=$("#"+textAreaId).val();
		if(text!="") {
			ChatUserService().onMessage(eventBus,chatUser,text);
			$("#"+textAreaId).val("");
		}
	})
}

