function application() {
	var eventBus=new EventBus("eventbus");
	
	var chatRoom=new ChatRoom();
	
	var chatUser1=new ChatUser("Vasya");
	var chatUSer2=new ChatUser("Masha");
	
	var chatUserService=new ChatUSerService();	
	var chatRoomService=new ChatRoomService();
}