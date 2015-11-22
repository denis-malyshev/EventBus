var users=[];

	/*users.push(new ChatUser("Vasya"));
	users.push(new ChatUser("Masha"));
	users.push(new ChatUser("Dima"));*/
	
	
describe("launch app", function() {
	before(function() {
		chat=new ChatRoom();
		});
	
	it("check the initial state of the chat", function() {
		unitjs.assert.equal(chat.messages.length,0);
		});
	});
