function ChatRoomService(message) {
	
	return {
		"onMessage": function(chatRoom,chatRoomComponent) {
			chatRoom.messages.push(message);
			chatRoomComponent.updateUI(chatRoom);	
		}
	}
}