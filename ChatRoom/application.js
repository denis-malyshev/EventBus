function app(users, chat, eventBus) {

    return {
        "launch": function () {
            for (var i = 0; i < users.length; i++) {
                new ChatUserView("user" + Math.floor(Math.random() * 10e5)+i, users[i], eventBus);
            }
            new ChatUserService(eventBus);
            new ChatRoomView("chat" + Math.floor(Math.random() * 10e5), eventBus);
            new ChatRoomService(chat, eventBus);
        }
    };
}
