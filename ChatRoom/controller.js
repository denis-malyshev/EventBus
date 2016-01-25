function register(registrationDTO) {	
	var data = JSON.stringify(registrationDTO);
	console.log(data);
	
	$.ajax({
		type:"POST",
		url:"http://localhost:8080/chat-service/user/register",
		data: data,
		contentType: "application/json",
		dataType: "json"
	}).done(function (data) {
		console.log(data);
	});
};

function login(loginInfo) {
	var data = JSON.stringify(loginInfo);
	console.log(data);
	
	$.ajax({
		type:"POST",
		url:"http://localhost:8080/chat-service/auth/login",
		data: data,
		contentType: "application/json",
		dataType: "json"
	}).done(function (data) {
		console.log(data);
		result = data;
	});
};

function logout(token) {
	var data = JSON.stringify(token);
	console.log(data);
	
	$.ajax({
		type:"DELETE",
		url:"http://localhost:8080/chat-service/auth/logout?token="+token
	}).done(function (data) {
		console.log(data);
	});
};

function creteChatRoom(chatRoomRequest) {
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

function joinUserToChat(updateChatRequest) {
	var data = JSON.stringify(updateChatRequest);
	console.log(data);
	
	$.ajax({
		type:"PUT",
		url:"http://localhost:8080/chat-service/chat/join",
		data: data,
		contentType: "application/json",
		dataType: "json"
	}).done(function (data) {
		console.log(data);
	});
};

function deleteUserFromChat(updateChatRequest) {
	var data = JSON.stringify(updateChatRequest);
	console.log(data);
	
	$.ajax({
		type:"PUT",
		url:"http://localhost:8080/chat-service/chat/join",
		data: data,
		contentType: "application/json",
		dataType: "json"
	}).done(function (data) {
		console.log(data);
	});
};

function readAllChats(token, userId) {
	$.ajax({
		type:"GET",
		url:"http://localhost:8080/chat-service/chat/chats/all?token=" + token + "&userId="+  userId
	}).done(function (data) {
		console.log(data);
	});
};

function Controller(eventBus) {
	this.eventBus = eventBus;
	
	this.eventBus.registerConsumer("REGISTRATION-ATTEMPT", function (RegistrationDTO) {
		register(RegistrationDTO);
	});
	
	this.eventBus.registerConsumer("LOGIN-ATTEMPT", function (LoginInfo) {
		login(LoginInfo);
	});
};
Controller.prototype.register = function (registrationDTO) {	
	var data = JSON.stringify(registrationDTO);
	console.log(data);
	
	$.ajax({
		type:"POST",
		url:"http://localhost:8080/chat-service/user/register",
		data: data,
		contentType: "application/json",
		dataType: "json"
	}).done(function (data) {
		this.eventBus.postMessage("SUCCESSFUL_REGISTRATION", data);
		console.log(data);
	});
};
Controller.prototype.login = function (loginInfo) {
	var data = JSON.stringify(loginInfo);
	console.log(data);
	
	$.ajax({
		type:"POST",
		url:"http://localhost:8080/chat-service/auth/login",
		data: data,
		contentType: "application/json",
		dataType: "json"
	}).done(function (data) {
		this.eventBus.postMessage("SUCCESSFUL_LOGIN", data.key);
		console.log(data);
	});
};
Controller.prototype.logout = function (token) {
	var data = JSON.stringify(token);
	console.log(data);
	
	$.ajax({
		type:"DELETE",
		url:"http://localhost:8080/chat-service/auth/logout?token="+token
	}).done(function (data) {
		console.log(data);
	});
};
Controller.prototype.creteChatRoom = function (chatRoomRequest) {
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