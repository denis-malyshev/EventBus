function Controller(eventbus, user) {
	var eventBus = eventbus;
	var user = user;
	
	var register = function (registrationDTO) {	
		var data = JSON.stringify(registrationDTO);
		console.log(data);
		
		$.ajax({
			type:"POST",
			url:"http://localhost:8080/chat-service/user/register",
			data: data,
			contentType: "application/json",
			dataType: "json"
		}).done(function (data) {
			eventBus.postMessage("REGISTRATION_SUCCESSFUL", data.id);
			console.log(data);
		});
	};
	

	eventBus.registerConsumer("REGISTRATION_ATTEMPT", function(registrationDTO) {
		register(registrationDTO);
	});
	
	var login = function (loginInfo) {
		var data = JSON.stringify(loginInfo);
		console.log(data);
		
		$.ajax({
			type:"POST",
			url:"http://localhost:8080/chat-service/auth/login",
			data: data,
			contentType: "application/json",
			dataType: "json"
		}).done(function (data) {
			eventBus.postMessage("LOGIN_SUCCESSFUL", data.key);
			console.log(data);
		});
	};
	
	eventBus.registerConsumer("LOGIN_ATTEMPT", function(loginInfo) {
		login(loginInfo);
	});
	
	var logout = function () {
		$.ajax({
			type:"DELETE",
			url:"http://localhost:8080/chat-service/auth/logout?token="+user.token
		}).done(function (data) {
			eventBus.postMessage("LOGOUT_SUCCESSFUL", null);
			console.log(data);
		});
	};
	
	eventBus.registerConsumer("LOGOUT_ATTEMPT", function() {
		logout();
	});
	
	var creteChatRoom = function (chatRoomName) {
		console.log(id);
		var chatRoomRequest = new ChatRoomRequest(new Token(token), new UserId(id), chatRoomName);
		var data = JSON.stringify(chatRoomRequest);
		console.log(data);
		
		$.ajax({
			type:"POST",
			url:"http://localhost:8080/chat-service/chat/create",
			data: data,
			contentType: "application/json",
			dataType: "json"
		}).done(function (data) {
			console.log(data);
		});
	};
	
	eventBus.registerConsumer("CREATE_CHAT_ATTEMPT", function(chatRoomName) {
		creteChatRoom(chatRoomName);
	});
};
