function ChatUser(name) {
	this.name=name;
}

function ChatUserService() {
	return function  onMessage(eventBus, sender, textMessgae) {
		return function() {
			eventBus.postMessage("MESSAGE_ADDED",new Message(sender, textMessgae));
		}
	};
}

