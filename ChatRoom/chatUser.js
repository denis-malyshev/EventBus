function ChatUser(name) {
	this.name=name;
	this.textAreaId=name+"id";
	this.btnId=name+"btnId";
};

function ChatUserService(eventBus) {
	var isEmpty=function(message) {
		return (!/\S/.test(message));
	};

	var onMessage=function(eventBus, message) {
		if(!isEmpty(message.textMessage)) {
			eventBus.postMessage(message.sender+"_TEXT_AREA");
			eventBus.postMessage("SENT",message);
		}
	};
	eventBus.registerConsumer("SEND",function(message) {
		onMessage(eventBus,message);
	});
}

function ChatUserView(divId,chatUser,eventBus) {
	var innerHTML='<div id="'+divId+'"></div>';
	document.body.innerHTML+=innerHTML;
	var textAreaId=chatUser.textAreaId;
	var btnId=chatUser.btnId;
	
	var renderUI=function(textAreaId) {
		$("#"+textAreaId).val("");
	};

	$("#"+divId).html('<div>'+chatUser.name+'</div>'+
			'<div><textarea id="'+textAreaId+'"></textarea></div>'
			+'<div><button id="'+btnId+'">Send</button></div>');

	eventBus.registerConsumer(chatUser.name+"_TEXT_AREA",function() {
		renderUI(textAreaId);
	});

	$(document).ready(function() {
		$("#"+btnId).click(function() {
			eventBus.postMessage("SEND",new Message(chatUser.name,$("#"+textAreaId).val()));
		});
	});


}

