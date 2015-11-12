function EventBus() {
	this.consumers ={};
};
EventBus.prototype.registerConsumer = function (consumer,type) {
	if(!this.consumers[type])
		this.consumers[type]=[];
	this.consumers[type].push(consumer);
	console.log("added " + this.consumers[type].length + " consumer");
};
EventBus.prototype.postMessage = function (message,type,eventBus) {
	for (var i = 0; i < this.consumers[type].length; i++) {
		var callback=this.consumers[type][i];
		setInterval(function () {
			callback(message)
		}, 1000);
	}
};