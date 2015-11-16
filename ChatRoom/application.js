function app() {
	var eventBus=new EventBus();

	var chatUser1=new ChatUser("Vasya");

	var chatUserComp=new ChatUserComponent("user1",chatUser1,eventBus);
	var chatUserService=new ChatUserService();

	var chat=new ChatRoom("chat");
	var chatComp=new ChatRoomComponent(chat);
	var chatController=new  ChatRoomController();
	var chatRoomService=new ChatRoomService();	

	eventBus.registerConsumer(function() {
		chatRoomService.onMessage(chat,chatComp);
	});
}