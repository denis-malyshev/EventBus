function Controller(eventbus, user) {
    var eventBus = eventbus;
    var user = user;

    var register = function (registrationDTO) {
        var data = JSON.stringify(registrationDTO);
        console.log(data);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/chat-service/user/register",
            data: data,
            contentType: "application/json",
            dataType: "json"
        }).done(function (data) {
            console.log(data);
        });
    };

    eventBus.registerConsumer("REGISTRATION_ATTEMPT", function (registrationDTO) {
        register(registrationDTO);
    });

    var login = function (loginInfo) {
        var data = JSON.stringify(loginInfo);
        console.log(data);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/chat-service/auth/login",
            data: data,
            contentType: "application/json",
            dataType: "json"
        }).done(function (data) {
            eventBus.postMessage("LOGIN_SUCCESSFUL", data);
            console.log(data);
        });
    };

    eventBus.registerConsumer("LOGIN_ATTEMPT", function (loginInfo) {
        login(loginInfo);
    });

    var logout = function () {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/chat-service/auth/logout?token=" + token
        }).done(function (data) {
            eventBus.postMessage("LOGOUT_SUCCESSFUL", null);
            console.log(data);
        });
    };

    eventBus.registerConsumer("LOGOUT_ATTEMPT", function () {
        logout();
    });

    var creteChatRoom = function (chatRoomName) {
        console.log(id);
        var chatRoomRequest = new ChatRoomRequest(new Token(token), new UserId(id), chatRoomName);
        var data = JSON.stringify(chatRoomRequest);
        console.log(data);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/chat-service/chat/create",
            data: data,
            contentType: "application/json",
            dataType: "json"
        }).done(function (data) {
            eventBus.postMessage("NEED_TO_UPDATE_CHAT_LIST");
            console.log(data);
        });
    };

    eventBus.registerConsumer("CREATE_CHAT_ATTEMPT", function (chatRoomName) {
        creteChatRoom(chatRoomName);
    });
	
    var readAllchats = function () {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/chat-service/chat/chats/all?token=" + token + '&userId=' + id
        }).done(function (data) {
            eventBus.postMessage("CHAT_LIST_LOADED", data);		
        }).always(function () {
			console.log("FAIL");
		});
    };

    eventBus.registerConsumer("MAIN_VIEW_LOAD", function () {
        readAllchats();
    });

    eventBus.registerConsumer("NEED_TO_UPDATE_CHAT_LIST", function () {
        readAllchats();
    });

    var joinToChat = function (chatRoomId) {	
        var updateChatRequest = new UpdateChatRequest(new Token(token), new UserId(id), new ChatRoomId(chatRoomId));
        var data = JSON.stringify(updateChatRequest);
        console.log(data);

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/chat-service/chat/join",
            data: data,
            contentType: "application/json",
            dataType: "json"
        }).always(function (data) {
			eventBus.postMessage("SUCCESSFUL_JOINED", chatRoomId);
            console.log(data);
        }).fail(function () {
			console.log("fail");
		});
    };

    eventBus.registerConsumer("JOIN_TO_CHAT_ATTEMPT", function (chatRoomId) {
        joinToChat(chatRoomId);
    });
	
	var leaveChat = function (chatRoomId) {
		var updateChatRequest = new UpdateChatRequest(new Token(token), new UserId(id), new ChatRoomId(chatRoomId));
        var data = JSON.stringify(updateChatRequest);
        console.log(data);

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/chat-service/chat/delete",
            data: data,
            contentType: "application/json",
            dataType: "json",
        }).always(function (data) {
            console.log(data);
        }).fail(function () {
			console.log("fail");
		});
	};
	
	eventBus.registerConsumer("LEAVE_FROM_CHAT_ATTEMPT", function (chatRoomId) {
        leaveChat(chatRoomId);
    });
	
	var sendMessage = function (receiverId, text) {
		var messageRequest = new MessageRequest(new Token(token), new UserId(id), receiverId, text);
		var data = JSON.stringify(messageRequest);
        console.log(data);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/chat-service/message/send",
            data: data,
            contentType: "application/json",
            dataType: "json"
        }).done(function (data) {
            console.log(data);
        });
	};
	
	eventBus.registerConsumer("SEND_MESSAGE_ATTEMPT", function (messsageData) {
		sendMessage(messsageData.receiverId, messsageData.text);
	});
	
	var sendPrivateMessage = function (receiverId, text) {
		var messageRequest = new MessageRequest(new Token(token), new UserId(id), receiverId, text);
		var data = JSON.stringify(messageRequest);
        console.log(data);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/chat-service/message/send_private",
            data: data,
            contentType: "application/json",
            dataType: "json"
        }).done(function (data) {
            console.log(data);
        });
	};
	
	eventBus.registerConsumer("SEND_PRIVATE_MESSAGE_ATTEMPT", function (receiverId, text) {
		sendMessage(receiverId, text);
	});
	
	var checkMessages = function (chatRoomId) {
		var readMessageRequest = new ReadMessageRequest(new Token(token), new UserId(id), new Date(new Date().getTime() - 1000 * 5), new ChatRoomId(chatRoomId));
		var data = JSON.stringify(readMessageRequest);
        console.log(data);
		
		$.ajax({
            type: "POST",
            url: "http://localhost:8080/chat-service/message/find_all_by_chat_after",
            data: data,
            contentType: "application/json",
            dataType: "json"
        }).done(function (data) {
            eventBus.postMessage(chatRoomId + "_MESSAGES_UPDATED", data);
            console.log(data);
        });
	};	
	
	eventBus.registerConsumer("CHECK_MESSAGES", function (chatRoomId) {
		var messageChecker = function () {
			checkMessages(chatRoomId);
		};
		
		setInterval(messageChecker, 1000 * 5);
	});
};
