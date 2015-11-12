function app() {
	var eventBus=new EventBus();
	
	var chatUser1=new ChatUser("Vasya");
	eventBus.registerConsumer(chatUser1,"MESSAGE_ADDED");
	var chatUserComp=new ChatUserComponent("user1",chatUser1,eventBus);
	var chatUserService=new ChatUserService();
	
	var chat=new ChatRoom("chat");
	var chatComp=new ChatRoomComponent();
	chatComp.updateUI(chat);
}