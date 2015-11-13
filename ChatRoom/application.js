function app() {
	var eventBus=new EventBus();
	
	var chatUser1=new ChatUser("Vasya");
	
	var chatUserComp=new ChatUserComponent("user1",chatUser1,eventBus);
	var chatUserService=new ChatUserService();
	
	var chat=new ChatRoom("chat");
	var chatComp=new ChatRoomComponent();
	var chatRoomService=new ChatRoomService();	
	
	eventBus.registerConsumer(chatRoomService.onMessage(chat,chatComp));
}