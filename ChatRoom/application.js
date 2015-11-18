function app() {
	var eventBus=new EventBus();

	var chatUser1=new ChatUser("Vasya");
	var chatUser2=new ChatUser("Masha");

	var chatUserView1=new ChatUserView("user1",chatUser1,eventBus);
	var chatUserView2=new ChatUserView("user2",chatUser2,eventBus);
	var chatUserService=new ChatUserService();

	var chat=new ChatRoom();
	var chatView=new ChatRoomView("chat");
	
	eventBus.registerConsumer("MODEL_UPDATED",function() {
		chatView.renderUI(chat.messages);
	});
	
	eventBus.registerConsumer("MESSAGE_ADDED",function(message) {
		chatUserService.onMessage(eventBus,chatUser1);
	});
	
	eventBus.registerConsumer("MESSAGE_ADDED",function(message) {
		chatUserService.onMessage(eventBus,chatUser2);
	});
}
