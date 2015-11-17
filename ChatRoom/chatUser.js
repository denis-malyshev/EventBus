function ChatUser(name) {
	this.name=name;
	this.textAreaId=name+"id";
	this.btnId=name+"btnId";
};

function ChatUserService() {
	return {
		"onMessage": function(eventBus, sender, textMessage) {
			eventBus.postMessage("MESSAGE_ADDED",new Message(sender.name,textMessage));
			eventBus.postMessage("MESSAGE_SENT",sender);
		}
	};
}

function ChatUserView(divId,chatUser,eventBus) {
	var selector="#"+divId;
	var textAreaId=chatUser.textAreaId;
	var btnId=chatUser.btnId;
	$(selector).html(chatUser.name+':<input type="textarea" id="'+textAreaId+'" value="">'
			+'<input type="button" id="'+btnId+'" value="send">');

	eventBus.registerConsumer("MESSAGE_SENT",function(sender) {
		renderUI(sender);
	})

	$("#"+btnId).click(function() {
		ChatUserService().onMessage(eventBus,chatUser,$("#"+textAreaId).val());
	});

	var renderUI=function(sender) {
		$("#"+sender.textAreaId).val("");
	}
}

