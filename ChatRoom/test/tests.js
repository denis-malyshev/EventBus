var chat;
var eb;
var chatUserService;
var chatRoomService;
var chatRoomView;

describe("Chat testing", function() {
	before(function() {
		chat=new ChatRoom("234");
		eb=new EventBus();
		chatUserService=new ChatUserService(eb);
        chatRoomService=new ChatRoomService(chat, eb);
		chatRoomView=new ChatRoomView(chat.id, eb);
	});
	
	it("Checking the initial state of the chat", function() {
		unitjs.assert.equal(chat.messages.length,0);	
	});
	
	it("Checking the state of the chat after adding first message", function() {
		var length=chat.messages.length;
		chat.addMessage(new Message("Vasya","Hello"));
		unitjs.assert.equal(chat.messages.length,length+1);
	});
	
	it("Checking of the chat contents", function() {
		unitjs.assert.equal(chat.messages[chat.messages.length-1].message,"Hello");
	});
	
	it("Adding message with eventBus", function(done) {
		eb.postMessage(chat.id, new Message("Vasya","hello",chat.id));
		setTimeout(function() {
			unitjs.assert.equal(chat.messages[chat.messages.length-1].message,"hello");
			done();
		},10);
	});
	
	it("Checking the message sending",function(done) {
		var length=chat.messages.length;
		eb.postMessage("SEND", new Message("Masha","test text",chat.id));
		setTimeout(function() {
			unitjs.assert.equal(chat.messages.length,length+1);
			done();
		},10);			
	});
	
	it("Send empty message",function(done) {
		var length=chat.messages.length;
		eb.postMessage("SEND", new Message("Masha","    ",chat.id));
		setTimeout(function() {
			unitjs.assert.equal(length,length);
			done();
		},10);			
	});
});

