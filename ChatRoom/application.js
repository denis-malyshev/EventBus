function app() {
	var eventBus=new EventBus();
	
	var chatUser1=new ChatUser("Vasya");
	var chatUserComp=new ChatUserComponent("user1",chatUser1);
	var chatUserService=new ChatUserService();
	
	var chat=new ChatRoom();
}