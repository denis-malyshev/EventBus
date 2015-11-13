function EventBus() {
	this.consumers =[];
};
EventBus.prototype.registerConsumer = function (consumer,type) {
	/*if(!this.consumers[type])
		this.consumers[type]=[];*/
	this.consumers.push(consumer);
	console.log("added " + this.consumers.length + " consumer");
};
EventBus.prototype.postMessage = function (type,message) {
	for (var i = 0; i < this.consumers.length; i++) {
		var callback=this.consumers[i];
		setInterval(function () {
			callback(message);
		}, 10);
	}
};