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

function StartView(eventbus) {
    var eventBus = eventbus;
    var divId = "start-view";
    var innerHTML = '<div id="' + divId + '" align="center"></div>';
    document.body.innerHTML = innerHTML;

    $("#" + divId).html('<div><h2>Registration</h2></br>' +
        'Name:</br><input type="text" id="firstName"></br>' +
        'Email:</br><input type="email" id="register-email"></br>' +
        'Password:</br><input type="password" id="register-pwd"></br>' +
        '<button id="registerBtn">Register</button></br>' +
        '<h2>Login</h2>' +
        'Email:</br><input type="email" id="login-email"></br>' +
        'Password:</br><input type="password" id="login-pwd"></br>' +
        '<button id="loginBtn">Login</button>'
    );

    $(document).ready(function () {
        $("#registerBtn").click(function () {
            eventBus.postMessage("REGISTRATION_ATTEMPT",
                new UserDTO($("#firstName").val(), $("#register-email").val(), $("#register-pwd").val()));
        });
		$("#loginBtn").click(function () {
            eventBus.postMessage("LOGIN_ATTEMPT",
                new LoginInfo($("#login-email").val(), $("#login-pwd").val()));
        });
    });
};

function MainView(eventBus) {
    var eventBus = eventBus;
    var innerHTML = '<div id="main-view"></div>';
    document.body.innerHTML = innerHTML;

    $("#main-view").html('<div align="right"><button id="logoutBtn">Logout</button></div>' +
        '</br><div align="left">Create chat:</br><input type="text" id="chat-name"></br>' +
        '<button id="create-chat">Create</button></div>');
		

    eventBus.registerConsumer("CHAT_LIST_LOADED", function (chatList) {
        showChatList(eventBus, chatList);

		document.getElementById("logoutBtn").onclick = function () {
			eventBus.postMessage("LOGOUT_ATTEMPT", null);
        };
		document.getElementById("create-chat").onclick = function () {
			eventBus.postMessage("CREATE_CHAT_ATTEMPT", $("#chat-name").val());
		};
    });
	
	eventBus.registerConsumer("SUCCESSFUL_JOINED", function (chatRoomId) {
		showChatComp(eventBus, chatRoomId);		
	});
};

function showChatComp(eventbus, chatRoomId) {
	var eventBus = eventbus;
    var innerHTML = '<div id="currentChat"></div>';
    document.body.innerHTML += innerHTML;

    $("#currentChat").html('<div align="center">Current chat:</br><textarea readonly rows="10" cols="50"></textarea></br> ' +
	'<input type="text" id="messageArea" align="left">' +
	'<button id="sendMessage">Send</button></div>');
	
	document.getElementById("sendMessage").onclick = function () {
		var messageData = new MessageData(chatRoomId, document.getElementById("messageArea").value);
		eventbus.postMessage("SEND_MESSAGE_ATTEMPT", messageData);
	};
};

function showChatList(eventBus, chatList) {
    var eventBus = eventBus;
    var innerHTML = '<div id="chat-list"></div>';
    document.body.innerHTML += innerHTML;

    var listBox = '<select id="selectChat">';

    for (var i = 0; i < Object.keys(chatList).length; i++) {
        listBox += '<option value="' + chatList[i].id + '">' + chatList[i].name + '</option>';
    }
    listBox += '</select>';

    $("#chat-list").html('Chat-rooms:</br>' + listBox +
        '<button id="join">Join</button><button id="leave">Leave</button>');

	document.getElementById("join").onclick = function () {
        eventBus.postMessage("JOIN_TO_CHAT_ATTEMPT", $("#selectChat").val());
    };
	document.getElementById("leave").onclick = function () {
        eventBus.postMessage("LEAVE_FROM_CHAT_ATTEMPT", $("#selectChat").val());
    };
};