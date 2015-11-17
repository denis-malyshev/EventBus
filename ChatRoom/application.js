function app() {
	var eventBus=new EventBus();

	var chatUser1=new ChatUser("Vasya");
	var chatUser2=new ChatUser("Masha");

	var chatUserComp1=new ChatUserComponent("user1",chatUser1,eventBus);
	var chatUserComp2=new ChatUserComponent("user2",chatUser2,eventBus);

	var chat=new ChatRoom("chat","chat1");
	var chatComp=new ChatRoomComponent(chat);
	var chatController=new  ChatRoomController();
	var chatRoomService=new ChatRoomService(chat,chatController);	
	
	eventBus.registerConsumer("MESSAGE_ADDED",function(message) {
		chatRoomService.onMessage(message);
	});
}