function EventBus() {
	this.consumers ={};
};
EventBus.prototype.registerConsumer = function (type,consumer) {
	if(!this.consumers[type])
		this.consumers[type]=[];
	this.consumers[type].push(consumer);
	console.log("added " + this.consumers[type].length + " consumer");
};
EventBus.prototype.postMessage = function (type,message) {
	for (var i = 0; i < this.consumers[type].length; i++) {
		var callback=this.consumers[type][i];
		setTimeout(function () {
			callback(message);
		}, 0);
	}
};