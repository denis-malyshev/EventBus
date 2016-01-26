function User(eventBus) {
	this.id = 0;
	this.token = null;
	this.eventBus = eventBus;
	
	eventBus.registerConsumer("REGISTRATION_SUCCESSFUL", function (id) {
		this.id = id;
		console.log(this.id+"ID");
	});
	
	eventBus.registerConsumer("LOGIN_SUCCESSFUL", function (token) {
		this.token = token;
		eventBus.postMessage("USER_LOGGED");
	});
};