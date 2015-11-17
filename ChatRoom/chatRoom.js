function ChatRoom(divId) {
	this.messages=[];
};

function ChatRoomComponent(divId) {
	var selector="#"+divId;
	$(selector).html('<textarea type="textarea" id="chatarea" rows="10" cols="35">');
}

function ChatRoomController() {
	return {
		"updateUI": function(chat) {
			var selector="#chatarea";
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