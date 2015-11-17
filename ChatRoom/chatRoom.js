function ChatRoom(divId,chatId) {
	this.messages=[];
	this.divId=divId;
	this.id=chatId;
};

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
				text+=chat.messages[i]+"\n";
			}
			$(selector).val(text);
		}
	};
}

function ChatRoomService(chat,chatControl) {
	return {
		"onMessage": function(message) {
			chat.messages.push(message);
			chatControl.updateUI(chat);
		}
	};
}