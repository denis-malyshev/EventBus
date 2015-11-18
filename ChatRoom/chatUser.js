function ChatUser(name) {
	this.name=name;
	this.textAreaId=name+"id";
	this.btnId=name+"btnId";
};

function ChatUserService(eventBus) {
	var isEmpty=function(message) {
		return (!/\S/.test(message));
	}

	return {
		"onMessage": function(eventBus, sender, text) {
			eventBus.postMessage("MESSAGE_SENT", new Message(sender,text));
		}
	};
}

function ChatUserView(divId,chatUser,eventBus) {
	var innerHTML='<div id="'+divId+'"></div>';
	document.body.innerHTML+=innerHTML;
	var textAreaId=chatUser.textAreaId;
	var btnId=chatUser.btnId;
	$("#"+divId).html('<div>'+chatUser.name+'</div>'+
			'<div><textarea id="'+textAreaId+'"></textarea></div>'
			+'<div><button id="'+btnId+'">Send</button></div>');

	$(document).ready(function() {
		$("#"+btnId).click(function() {
			eventBus.postMessage("MESSAGE_ADDED",new Message(chatUser.name,$("#"+textAreaId).val()));
		});
	});

	return {
		"renderUI": function(sender) {
			$("#"+sender.textAreaId).val("");
		}
	}
}

