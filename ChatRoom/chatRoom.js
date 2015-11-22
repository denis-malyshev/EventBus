function ChatRoom() {
    this.messages = [];
    this.id ="chat-" + Math.floor(Math.random() * 10e3);
};
ChatRoom.prototype.addMessage = function (message) {
    var length = this.messages.length;
    this.messages[length] ={
        sender: message.sender,
        message: message.textMessage,
        time: message.time
    };
}

function ChatRoomComponent(chatId) {
    var innerHTML = '<div id="' + chatId + '">empty chat</div>';
    document.body.innerHTML += innerHTML;
}

function ChatRoomView(chatId,eventBus) {
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

    eventBus.registerConsumer(chatId+"_MODEL_UPDATED", function (messages) {
        renderUI(messages);
    });
}

function ChatRoomService(chat,eventBus) {

    function onMessage(message) {
        chat.addMessage(message);
        eventBus.postMessage(chat.id+"_MODEL_UPDATED", chat.messages);
    };
    
    eventBus.registerConsumer(chat.id, function (message) {
        onMessage(message);
    });
}
