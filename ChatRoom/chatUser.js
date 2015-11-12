function ChatUser(name) {
	this.name=name;
}

function ChatUserService() {
	return function  onMessage(eventBus, sender, textMessgae) {
		return eventBus.postMessage("MESSAGE_ADDED",new Message(sender, textMessgae));		
	};
}

function ChatUserComponent(comp,chatUser,eventBus) {
	return 45;
}

