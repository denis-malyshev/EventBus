function ChatUser(name) {
    this.name = name;
    this.textAreaId = name + Math.floor(Math.random() * 10e5);
    this.btnId = name + Math.floor(Math.random() * 10e5);
};

function ChatUserService(eventBus) {
    var isEmpty = function (message) {
        return (!/\S/.test(message));
    };

    var onMessage = function (message) {
        if (!isEmpty(message.textMessage)) {
            eventBus.postMessage(message.chatId, message);
        }
    };

    eventBus.registerConsumer("SEND", function (message) {
        onMessage(message);
    });
}

function ChatUserComponent(divId, chatUser, eventBus) {
    var innerHTML = '<div id="' + divId + '"></div>';
    document.body.innerHTML += innerHTML;
    var textAreaId = chatUser.textAreaId;
    var btnId = chatUser.btnId;
    var chatId=chatUser.chatId;

    $("#" + divId).html('<div>' + chatUser.name + '</div>' +
        '<div><textarea id="' + textAreaId + '"></textarea></div>'
        + '<div><button id="' + btnId + '">Send</button></div>');

    $(document).ready(function () {
        $("#" + btnId).click(function () {
            eventBus.postMessage("SEND", new Message(chatUser.name, $("#" + textAreaId).val(),chatId));
            $("#" + textAreaId).val("");
        });
    });
}

