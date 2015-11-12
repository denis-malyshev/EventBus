var app=function() {
	
	var chatUserComp=new ChatUserComponent();
	
	return {
		"run": function() {
			chatUserComp.addButton();
		}
	}
}