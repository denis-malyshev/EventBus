function View(eventBus) {
	this.eventBus = eventBus;
	
	eventBus.registerConsumer("USER_LOGGED", function() {
		MainView(eventBus);
	});
	eventBus.registerConsumer("LOGOUT_SUCCESSFUL", function() {
		StartView(eventBus);
	});
};
View.prototype.launch = function() {
	StartView(this.eventBus);
};

function StartView(eventBus) {
	var eventBus = eventBus;
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
		
	$(document).ready(function () {
		$("#logoutBtn").click(function () {
			eventBus.postMessage("LOGOUT_ATTEMPT", null);
		});
	});
	
	$(document).ready(function () {
		$("#create-chat").click(function () {
			eventBus.postMessage("CREATE_CHAT_ATTEMPT", $("#chat-name").val());
		});
	});
};