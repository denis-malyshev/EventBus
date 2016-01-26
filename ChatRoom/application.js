function app(/*users, chat, */eventBus) {
	
    return {
        "launch": function () {
			new Controller(eventBus, new User(eventBus));
			new View(eventBus).launch();
			/*new renderRegistrationComp(eventBus);
			new renderLoginComp(eventBus);*/
			//new registrationComp(eventBus);
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
