function View(eventBus) {
    this.eventBus = eventBus;

    eventBus.registerConsumer("USER_LOGGED", function () {
        MainView(eventBus);
    });
    eventBus.registerConsumer("LOGOUT_SUCCESSFUL", function () {
        StartView(eventBus);
    });
};
View.prototype.launch = function () {
    StartView(this.eventBus);
};

function StartView(eventBus) {
    this.eventBus = eventBus;
    var divId = "start-view";
    var innerHTML = '<div id="' + divId + '" align="center"></div>';
    document.body.innerHTML = innerHTML;

    $("#" + divId).html('<div><h2>Registration</h2></br>' +
        'Name:</br><input type="text" id="firstName"></br>' +
        'Email:</br><input type="text" id="register-email"></br>' +
        'Password:</br><input type="password" id="register-pwd"></br>' +
        '<button id="registerBtn">Register</button></br>' +
        '<h2>Login</h2>' +
        'Email:</br><input type="text" id="login-email"></br>' +
        'Password:</br><input type="password" id="login-pwd"></br>' +
        '<button id="loginBtn">Login</button>'
    );

    $(document).ready(function () {
        $("#registerBtn").click(function () {
            eventBus.postMessage("REGISTRATION_ATTEMPT",
                new UserDTO($("#firstName").val(), $("#register-email").val(), $("#register-pwd").val()));
        });
    });
    $(document).ready(function () {
        $("#loginBtn").click(function () {
            eventBus.postMessage("LOGIN_ATTEMPT",
                new LoginInfo($("#login-email").val(), $("#login-pwd").val()));
        });
    });
};

function MainView(eventBus) {
    var eventBus = eventBus;
    var divId = "main-view";
    var innerHTML = '<div id="' + divId + '"></div>';
    document.body.innerHTML = innerHTML;

    $("#" + divId).html('<div align="right"><button id="logoutBtn">Logout</button></div>' +
        '<div align="left">Create chat:</br><input type="text" id="chat-name"></br>' +
        '<button id="create-chat">Create</button></div>');

    eventBus.registerConsumer("CHAT_LIST_LOADED", function (chatList) {
        showChatList(eventBus, chatList);

        $(document).ready(function () {
            $("#logoutBtn").click(function () {
                eventBus.postMessage("LOGOUT_ATTEMPT", null);
            });
            $("#create-chat").click(function () {
                eventBus.postMessage("CREATE_CHAT_ATTEMPT", $("#chat-name").val());
            });
        });
    });
};

function showChatComp(eventBus, chatRoomName) {
    var eventBus = eventBus;
    var divId = "currentChat";
    var innerHTML = '<div id="' + divId + '"></div>';
    document.body.innerHTML = innerHTML;

    $("#" + divId).html('<div align="center">' + chatRoomName + '</div>');

    $(document).ready(function () {
        $("#create-chat").click(function () {
            eventBus.postMessage("LOGOUT_ATTEMPT", null);
        });
    });
};

function showChatList(eventBus, chatList) {
    var eventBus = eventBus;
    var divId = "chat-list";
    var innerHTML = '<div id="' + divId + '"></div>';
    document.body.innerHTML += innerHTML;

    var listBox = '<select id="selectChat">';

    for (var i = 0; i < Object.keys(chatList).length; i++) {
        listBox += '<option value="' + chatList[i].id + '">' + chatList[i].name + '</option>';
    }
    listBox += '</select>';

    $("#" + divId).html('<div align="left">Chat-rooms:</br>' + listBox +
        '<button id="join">Join</button></div>');

    $(document).ready(function () {
        $("#join").click(function () {
            eventBus.postMessage("JOIN_TO_CHAT_ATTEMPT", $("#selectChat").val());
        });
    });
};