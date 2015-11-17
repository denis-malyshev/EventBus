function ChatRoom(chatId) {
	this.messages=[];
};
ChatRoom.prototype.addMessage=function(message) {
	var length=this.messages.length;
	this.messages[length]={
			sender:message.sender,
			message:message.textMessage,
			time:message.time
	};
}
function ChatRoomView(divId,chat,eventBus) {
	var selector="#"+divId;

	eventBus.registerConsumer("MODEL_UPDATED",function() {
		renderUI();
	});

	eventBus.registerConsumer("MESSAGE_ADDED",function(message) {
		ChatRoomService(chat,this,eventBus).onMessage(message);
	});

	var renderUI=function() {
		var text="";
		var lastSender="";
		for(var i=0;i<chat.messages.length;i++) {
			if(lastSender!=chat.messages[i].sender) {
				text+=chat.messages[i].sender+":<br>"+chat.messages[i].time+
				": "+chat.messages[i].message+"<br>";
				lastSender=chat.messages[i].sender;
			}
			else
				text+=chat.messages[i].time+
				": "+chat.messages[i].message+"<br>";
		}
		$(selector).html(text);
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
