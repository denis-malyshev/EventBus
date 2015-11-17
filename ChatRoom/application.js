function app() {
	var eventBus=new EventBus();

	var chatUser1=new ChatUser("Vasya");
	var chatUser2=new ChatUser("Masha");

	var chatUserComp1=new ChatUserComponent("user1",chatUser1,eventBus);
	var chatUserComp2=new ChatUserComponent("user2",chatUser2,eventBus);

	var chat=new ChatRoom("chat1");
	var chatView=new ChatRoomView("chat",chat,eventBus);
	var chatRoomService=new ChatRoomService(chat,chatView,eventBus);	
	
	eventBus.registerConsumer("MESSAGE_ADDED",function(message) {
		chatRoomService.onMessage(message);
	});
}