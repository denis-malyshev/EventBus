function ChatUser(name) {
	this.name=name;
}

function ChatUserService() {
	return function  onMessage(eventBus, sender, textMessgae) {
		return eventBus.postMessage("MESSAGE_ADDED",new Message(sender, textMessgae));		
	};
}

function ChatUserComponent(chatUser,eventBus) {
	var parentElement=document.body;
	var outDiv=document.createElement('div');
	outDiv.id = 'outDiv';
	outDiv.innerHTML = 'Ввод прошел успешно.';
	parentElem.appendChild(outDiv);
}

