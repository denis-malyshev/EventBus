function app(users, eventBus) {
    
    var chat;
    var chatRoomView;
    var chatRoomService;
    var chatRoomComponent;
    
    return {
        "launch": function () {
			chat=new ChatRoom();
            chatRoomView=new ChatRoomView(chat.id,eventBus);
            chatRoomService=new ChatRoomService(chat, eventBus);
            for (var i = 0; i < users.length; i++) {
				users[i].chatId=chat.id;
                new ChatUserComponent("user" + Math.floor(Math.random() * 10e5) + i, users[i], eventBus);
            }
            chatRoomComponent=new ChatRoomComponent(chat.id);
        }
    };
}
