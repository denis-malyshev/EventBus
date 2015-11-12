function ChatRoom() {
	this.messages=[];
}

function ChatRoomComponent() {
	return {
		"updateUI": function(chatRoom) {
		}
	}
}

function ChatRoomService(message) {
	
	return {
		"onMessage": function(chatRoom,chatRoomComponent) {
			chatRoom.messages.push(message);
			chatRoomComponent.updateUI(chatRoom);	
		}
	}
}