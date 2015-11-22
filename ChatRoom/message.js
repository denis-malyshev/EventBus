function Message(sender, textMessgae, chatId) {
    this.sender = sender;
    this.textMessage = textMessgae;
    this.chatId=chatId;
    this.time = new Date().toLocaleTimeString();
};
