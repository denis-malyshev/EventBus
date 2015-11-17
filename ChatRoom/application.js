function app() {
	var eventBus=new EventBus();

	var chatUser1=new ChatUser("Vasya");

	var chatUserComp=new ChatUserComponent("user1",chatUser1,eventBus);
	var chatUserService=new ChatUserService();

	var chat=new ChatRoom();
	var chatComp=new ChatRoomComponent("chat");
	var chatController=new  ChatRoomController();
	var chatRoomService=new ChatRoomService(chat,chatController);	
	
	eventBus.registerConsumer("MESSAGE_ADDED",function(message) {
		chatRoomService.onMessage(message);
	});
}