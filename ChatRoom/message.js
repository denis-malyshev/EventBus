function Message(sender,textMessgae) {
	this.sender=sender;
	this.textMessage=textMessgae;
}
Message.prototype.getTextMessage=function() {
	return this.textMessage;
}
Message.prototype.getSender=function() {
	return this.sender;
}
