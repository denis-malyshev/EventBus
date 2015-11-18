function ChatUser(name) {
	this.name=name;
	this.textAreaId=name+"id";
	this.btnId=name+"btnId";
};

function ChatUserService() {

	var isEmpty=function(message) {
		 return (!/\S/.test(message));
	}

	return {
		"onMessage": function(eventBus, sender, textMessage) {
			if(!isEmpty(textMessage)) {
				eventBus.postMessage("MESSAGE_ADDED",new Message(sender.name,textMessage));
				eventBus.postMessage("MESSAGE_SENT",sender);
			}
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
			ChatUserService().onMessage(eventBus,chatUser,$("#"+textAreaId).val());
		});
	});
	
	eventBus.registerConsumer("MESSAGE_SENT",function(sender) {
		renderUI(sender);
	});
	
	var renderUI=function(sender) {
		$("#"+sender.textAreaId).val("");
	}
}

