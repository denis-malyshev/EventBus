function ChatRoom(divId,chatId) {
	this.messages=[];
	this.divId=divId;
	this.id=chatId;
};
ChatRoom.prototype.addMessage=function(message) {
	var length=this.messages.length;
	this.messages[length]={
			sender:message.sender,
			message:message.textMessage
	};
}

function ChatRoomComponent(chat) {
	var selector="#"+chat.divId;
	$(selector).html('<textarea type="textarea" id="'+chat.id+'" rows="10" cols="35">');
}

function ChatRoomController() {
	return {
		"updateUI": function(chat) {
			var selector="#"+chat.id;
			var text="";
			for(var i=0;i<chat.messages.length;i++) {
				text+=chat.messages[i].sender+": "+chat.messages[i].message+"\n";
			}
			$(selector).val(text);
		}
	};
}

function ChatRoomService(chat) {
	return {
		"onMessage": function(message) {
			chat.addMessage(message);
			ChatRoomController().updateUI(chat);
		}
	};
}