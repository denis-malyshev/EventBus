function View(eventBus) {
	this.eventBus = eventBus;	
};
ChatView.prototype.renderRegistrationComp = function () {
	var divId = "registration-form";
	var innerHTML = '<div id="' + divId + '" align="center"></div>';
	document.body.innerHTML = innerHTML;
	
	$("#" + divId).html('<div><h1>Registration</h1></br>' +
	'Name:</br><input type="text" id="firstName"></br>' +
	'Email:</br><input type="text" id="register-email"></br>' +
	'Password:</br><input type="password" id="register-pwd"></br>' +
	'<button id="registerBtn">Register</button></br>');
	
	$(document).ready(function () {
		$("#registerBtn").click(function () {
			this.eventBus.postMessage("REGISTRATION-ATTEMPT", 
			new UserDTO($("#firstName").val(), $("#register-email").val(), $("#register-pwd").val()));
		});
	});
};
View.prototype.renderLoginComp = function () {
	var divId = "login-form";
	var innerHTML = '<div id="' + divId + '" align="center"></div>';
	document.body.innerHTML += innerHTML;
	
	$("#" + divId).html('<div><h1>Login</h1>' +
	'Email:</br><input type="text" id="login-email"></br>' +
	'Password:</br><input type="password" id="login-pwd"></br>' +
	'<button id="loginBtn">Login</button>');
	
	$(document).ready(function () {
		$("#loginBtn").click(function () {
			this.eventBus.postMessage("LOGIN-ATTEMPT", 
			new LoginInfo($("#login-email").val(), $("#login-pwd").val()));
			logoutComp(eventBus);
			createChatRoomComp(eventBus);
		});
	});
};
View.prototype.renderLogoutComp = function () {
	var divId = "logout";
	var innerHTML = '<div id="' + divId + '" align="right"></div>';
	document.body.innerHTML = innerHTML;
	
	$("#" + divId).html('<button id="logoutBtn">Logout</button>');
	
	/*this.eventBus.registerConsumer("LOGOUT", function (token) {
		logout(token);
	});*/
	
	$(document).ready(function () {
		$("#logoutBtn").click(function () {
			/*this.eventBus.postMessage("LOGOUT", function (eventBus) {
				
			});*/
			registrationComp(eventBus);
			loginComp(eventBus);
		});
	});
};

function registrationComp(eventBus) {
	var divId = "registration-form";
	var innerHTML = '<div id="' + divId + '" align="center"></div>';
	document.body.innerHTML = innerHTML;
	
	$("#" + divId).html('<div><h1>Registration</h1></br>' +
	'Name:</br><input type="text" id="firstName"></br>' +
	'Email:</br><input type="text" id="register-email"></br>' +
	'Password:</br><input type="password" id="register-pwd"></br>' +
	'<button id="registerBtn">Register</button></br>');
	
	eventBus.registerConsumer("REGISTRATION", function (RegistrationDTO) {
		register(RegistrationDTO);
	});
	
	$(document).ready(function () {
		$("#registerBtn").click(function () {
			eventBus.postMessage("REGISTRATION", 
			new UserDTO($("#firstName").val(), $("#register-email").val(), $("#register-pwd").val()));
		});
	});
};

function loginComp(eventBus) {
	var divId = "login-form";
	var innerHTML = '<div id="' + divId + '" align="center"></div>';
	document.body.innerHTML += innerHTML;
	
	$("#" + divId).html('<div><h1>Login</h1>' +
	'Email:</br><input type="text" id="login-email"></br>' +
	'Password:</br><input type="password" id="login-pwd"></br>' +
	'<button id="loginBtn">Login</button>');
	
	eventBus.registerConsumer("LOGIN", function (LoginInfo) {
		login(LoginInfo);
	});
	
	$(document).ready(function () {
		$("#loginBtn").click(function () {
			eventBus.postMessage("LOGIN", 
			new LoginInfo($("#login-email").val(), $("#login-pwd").val()));
			logoutComp(eventBus);
			createChatRoomComp(eventBus);
		});
	});
};

function logoutComp(eventBus) {
	var divId = "logout";
	var innerHTML = '<div id="' + divId + '" align="right"></div>';
	document.body.innerHTML = innerHTML;
	
	$("#" + divId).html('<button id="logoutBtn">Logout</button>');
	
	/*eventBus.registerConsumer("LOGOUT", function (token) {
		logout(token);
	});*/
	
	$(document).ready(function () {
		$("#logoutBtn").click(function () {
			/*eventBus.postMessage("LOGOUT", function (eventBus) {
				
			});*/
			registrationComp(eventBus);
			loginComp(eventBus);
		});
	});
};

function createChatRoomComp(eventBus) {
	var divId = "create-chat-room";
	var innerHTML = '<div id="' + divId + '" align="center"></div>';
	document.body.innerHTML += innerHTML;
	
	$("#" + divId).html('<div><h1>Create chat-room</h1>' +
	'Name:</br><input type="text" id="chat-room-name"></br>' +
	'<button id="create-chat-room">Create</button></div>');
	
	eventBus.registerConsumer("CREATE-CHAT-ROOM", function (name) {
		createChatRoom(name);
	});
};
