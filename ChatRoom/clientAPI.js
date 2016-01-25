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

function executeRequest(url, requestType, data) {
	var data = JSON.stringify(data);
	console.log(data);
	
	if(requestType == "GET" || requestType == "DELETE") {
		$.ajax({
			type: requestType,
			url: url,
			data: data
			}).done(function (data) {
			console.log(data);
	} else {
		$.ajax({
			type: requestType,
			url: url,
			data: data,
			contentType: "application/json",
			dataType: "json"
			}).done(function (data) {
			console.log(data);
	});
	}
};

function ClientAPI(eventBus) {
	this.user = new user(eventBus);
	this.eventBus = eventBus;
};
ClientAPI.prototype.register = function (registrationDTO) {	
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
ClientAPI.prototype.login = function (loginInfo) {
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
	});
};
ClientAPI.prototype.logout = function (token) {
	var data = JSON.stringify(token);
	console.log(data);
	
	$.ajax({
		type:"DELETE",
		url:"http://localhost:8080/chat-service/auth/logout?token="+token
	}).done(function (data) {
		console.log(data);
	});
};
ClientAPI.prototype.creteChatRoom = function (chatRoomRequest) {
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