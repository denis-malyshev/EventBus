function ChatUser(name) {
	this.name=name;
}

function ChatUserService() {
	return function  onMessage(eventBus, sender, textMessgae) {
		return eventBus.postMessage("MESSAGE_ADDED",new Message(sender, textMessgae));		
	};
}

var ChatUserComponent=function() {
	$('#user1').append('<input type="button" value="My button">');
}

