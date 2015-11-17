function ChatRoom(chatId) {
	this.messages=[];
	this.id=chatId;
};
ChatRoom.prototype.addMessage=function(message) {
	var length=this.messages.length;
	this.messages[length]={
			sender:message.sender,
			message:message.textMessage
	};
}
function ChatRoomView(divId,chat,eventBus) {
	var selector="#"+divId;
	$(selector).html('<textarea type="textarea" id="'+chat.id+'" rows="10" cols="35">');

	eventBus.registerConsumer("MODEL_UPDATED",function() {
		renderUI();
	});

	var renderUI=function() {
		var selector="#"+chat.id;
		var text="";
		var lastSender="";
		for(var i=0;i<chat.messages.length;i++) {
			if(lastSender!=chat.messages[i].sender) {
				text+=chat.messages[i].sender+":\n"+chat.messages[i].message+"\n";
				lastSender=chat.messages[i].sender;
			}
			else
				text+=chat.messages[i].message+"\n";
		}
		$("#"+chat.id).val(text);
	};
}

function ChatRoomService(chat,chatView,eventBus) {
	return {
		"onMessage": function(message) {
			chat.addMessage(message);
			eventBus.postMessage("MODEL_UPDATED",function() {
				console.log("update model");
			});
		}
	};
}