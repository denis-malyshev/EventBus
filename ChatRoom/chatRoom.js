function ChatRoom() {
	this.messages=[];
}

function ChatRoomService() {
	return function onMessage(chatRoom,chatRoomComponent) {
		return function(message) {
			chatRoom.messages.push(message);
			chatRoomComponent.updateUI(chatRoom);	
		}
	}
}

function ChatRoomComponent() {
	return function updateUI(chatRoom) {
		
	}
}