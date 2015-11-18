function EventBus() {
	this.consumers ={};
};
EventBus.prototype.registerConsumer = function (type,consumer) {
	if(!this.consumers[type])
		this.consumers[type]=[];
	this.consumers[type].push(consumer);
	console.log("added consumer " + type);
};
EventBus.prototype.postMessage = function (type,message) {
	alert(this.consumers[type].length);
	for (var i = 0; i < this.consumers[type].length; i++) {
		var callback=this.consumers[type][i];
		setTimeout(function () {
			callback(message);
			console.log("message posted to "+type);
		}, 0);
	}
};