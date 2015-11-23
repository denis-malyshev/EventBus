function EventBus() {
    this.consumers = {};
};
EventBus.prototype.registerConsumer = function (type, consumer) {
    if (!this.consumers[type]) {
        this.consumers[type] = [];
    }
    this.consumers[type].push(consumer);
    console.log(new Date().toLocaleTimeString()+": added consumer " + type);
};
EventBus.prototype.postMessage = function (type, message) {
    for (var i = 0; i < this.consumers[type].length; i++) {
        var callback = this.consumers[type][i];
        setTimeout(function () {
            callback(message);
            console.log(new Date().toLocaleTimeString()+": message posted to " + type);
        }, 0);
    }
};
