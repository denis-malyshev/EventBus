function ChatRoom(id) {
	this.messages=[];
	var _id=id;

	return {
		"getId": function() {
			return _id;
		}
	};
}

function ChatRoomComponent() {
	return {
		"updateUI": function(chat) {
			var selector="#"+chat.getId();
			$(selector).html('<textarea type="textarea" id="chatarea" rows="10" cols="35" value="">');
		}
	};
}

function ChatRoomService() {
	return {
		"onMessage": function(message,chat,chatComponent) {
			chatRoom.messages.push(message);
			chatRoomComponent.updateUI(chatRoom);	
		}
	}
}