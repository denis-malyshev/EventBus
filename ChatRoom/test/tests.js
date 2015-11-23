var chat;
var eb;
var chatUserService;
var chatRoomService;
var chatRoomView;

describe("Test app", function() {
	before(function() {
		chat=new ChatRoom("234");
		eb=new EventBus();
		chatUserService=new ChatUserService(eb);
        chatRoomService=new ChatRoomService(chat, eb);
		chatRoomView=new ChatRoomView(chat.id, eb);
	});

	beforeEach(function(done) {
		setTimeout(function(){
			done();
		},100);
	});
	
	it("check the initial state of the chat", function() {
		unitjs.assert.equal(chat.messages.length,0);
	});
	
	it("check the state of the chat after adding first message", function() {
		chat.addMessage(new Message("Vasya","Hello"));
		unitjs.assert.equal(chat.messages.length,1);
	});
	
	it("check of the chat contents", function() {
		unitjs.assert.equal(chat.messages[0].message,"Hello");
	});
	
	it("adding message with eb", function() {
		eb.postMessage(chat.id, new Message("Vasya","hello",chat.id));
		unitjs.assert.equal(chat.messages[1].message,"hello");
	});
	
	it("testing send message",function() {
		eb.postMessage("SEND", new Message("Masha","test text",chat.id));
		unitjs.assert.equal(chat.messages.length,2);
	});
});

