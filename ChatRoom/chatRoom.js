function ChatRoom(id) {
	this.messages=[];
	var _id=id;

	return {
		"getId": function() {
			return _id;
		}
	};
};

function ChatRoomComponent(chat) {
	var selector="#"+chat.getId();
	$(selector).html('<textarea type="textarea" id="chatarea" rows="10" cols="35">');
}

function ChatRoomController() {
	return {
		"updateUI": function(chat) {
			var selector="#"+chat.getId();
			//var text=$("#area").val();
			/*for(var i=0;i<chat.messages.length;i++) {
				text+=chat.messages[i];
			}*/
			$(selector).val("text");
		}
	};
}

function ChatRoomService() {
	return {
		"onMessage": function(chat,chatControl) {
			//chat.messages.push(message);
			chatControl.updateUI(chat);
		}
	};
}