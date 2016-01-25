function app(/*users, chat, */eventBus) {
    
    return {
        "launch": function () {
			new user(eventBus);
			new registrationComp(eventBus);
			new loginComp(eventBus);
			//new logout(eventBus);
            /*new ChatRoomView(chat.id, eventBus);
            new ChatRoomService(chat, eventBus);
            for (var i = 0; i < users.length; i++) {
				users[i].chatId=chat.id;
                new ChatUserComponent("user" + Math.floor(Math.random() * 10e5) + i, users[i], eventBus);
            }
            new ChatRoomComponent(chat.id);*/
        }
    };
}
