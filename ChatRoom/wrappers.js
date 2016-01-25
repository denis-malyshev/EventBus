function UserDTO(name, email, password) {
	this.firstName = name;
	this.email = email;
	this.password = password;
};

function LoginInfo(email, password) {
	this.email = email;
	this.password = password;
};

function UserId(userId) {
	this.userId = userId;
};

function ChatRoomId(chatRoomId) {
	this.chatRoomId = chatRoomId;
};

function Token(token) {
	this.token = token;
};

function ChatRoomRequest(token, userId, name) {
	this.token = token;
	this.userId = userId;
	this.name = name;
};

function MessageRequest(token, userId, receiverId, test) {
	 this.token = token;
     this.userId = userId;
     this.receiverId = receiverId;
     this.text = text;
};

function ReadMessageRequest(token, userId, date) {
	 this.token = token;
     this.userId = userId;
     this.date = date;
};

function UpdateChatRequest(token, userId, chatRoomId) {
	this.token = token;
    this.userId = userId;
	this.chatRoomId = chatRoomId;
};