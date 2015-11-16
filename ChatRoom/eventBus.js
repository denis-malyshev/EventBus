function EventBus() {
	this.consumers =[];
};
EventBus.prototype.registerConsumer = function (consumer) {
	this.consumers.push(consumer);
	console.log("added " + this.consumers.length + " consumer");
};
EventBus.prototype.postMessage = function (message) {
	for (var i = 0; i < this.consumers.length; i++) {
		var callback=this.consumers[i];
		alert(callback);
		setTimeout(function () {
			callback(message);
		}, 10);
	}
};