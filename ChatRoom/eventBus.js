var EventBus = function (name) {
	this.name = name;
	this.consumers ={};
};
EventBus.prototype.registerConsumer = function (consumer,type) {
	if(this.consumers[type])
		this.consumers[type]=[];
	this.consumers[type].push(consumer);
	console.log("added " + this.consumers.length + " consumer");
};
EventBus.prototype.postMessage = function (message,type) {
	for (var i = 0; i < this.consumers[type].length; i++) {
		setInterval(function (consumer) {
			return function () {
				return consumer(message)
			};
		}(this.consumers[type][i]), 1000);
	}
};