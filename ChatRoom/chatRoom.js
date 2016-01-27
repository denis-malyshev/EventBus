function ChatRoom(name) {
    this.id = "chat-" + id;
    this.name = name;
    this.messages = [];
    this.users = {};
};
ChatRoom.prototype.addMessage = function (message) {
    var length = this.messages.length;
    this.messages[length] = {
        sender: message.sender,
        message: message.textMessage,
        time: message.time
    };
}
ChatRoom.prototype.joinUser = function (user) {
    this.users.push(user);
}
ChatRoom.prototype.deleteUser = function (userId) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            users.splice(i, 1);
        }
    }
}

function ChatRoomComponent(chatId) {
    var innerHTML = '<div id="' + chatId + '" align="center"></div>';
    document.body.innerHTML += innerHTML;
}

function ChatRoomView(chatId, eventBus) {
    var renderUI = function (messages) {
        var text = "";
        var lastSender = "";
        for (var i = 0; i < messages.length; i++) {
            if (lastSender != messages[i].sender) {
                text += messages[i].sender + ":<br>" + messages[i].time +
                    ": " + messages[i].message + "<br>";
                lastSender = messages[i].sender;
            }
            else {
                text += messages[i].time +
                    ": " + messages[i].message + "<br>";
            }
        }
        $("#" + chatId).html(text);
    }
    eventBus.registerConsumer(chatId + "_MODEL_UPDATED", function (messages) {
        renderUI(messages);
    });
}

function ChatRoomService(chat, eventBus) {

    function onMessage(message) {
        chat.addMessage(message);
        eventBus.postMessage(chat.id + "_MODEL_UPDATED", chat.messages);
    };

    eventBus.registerConsumer(chat.id, function (message) {
        onMessage(message);
    });
}
