function user(eventBus) {
	this.id = 0;
	this.token = null;
	this.email = null;
	this.eventBus = eventBus;
	
	eventBus.registerConsumer("SUCCESSFUL_REGISTRATION", function (registrationData) {
		this.id = registrationData.id;
		this.email = registrationData.email;
		console.log("working");
	});
	
	eventBus.registerConsumer("SUCCESSFUL_LOGIN", function (token) {
		this.token = token;
	});
};
