function ChatRoom() {
    this.messages = [];
};
ChatRoom.prototype.addMessage = function (message) {
    var length = this.messages.length;
    this.messages[length] = {
        sender: message.sender,
        message: message.textMessage,
        time: message.time
    };
}

function ChatRoomView(divId, eventBus) {
    var innerHTML = '<div id="' + divId + '"></div>';
    document.body.innerHTML += innerHTML;

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
        $("#" + divId).html(text);
    }

    eventBus.registerConsumer("MODEL_UPDATED", function (messages) {
        renderUI(messages);
    });
}

function ChatRoomService(chat, eventBus) {
    var onMessage = function (message) {
        chat.addMessage(message);
        eventBus.postMessage("MODEL_UPDATED", chat.messages);
    };

    eventBus.registerConsumer("SENT", function (message) {
        onMessage(message)
    });
}
