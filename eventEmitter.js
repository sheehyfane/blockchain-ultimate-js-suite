class ChainEventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, callback) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(callback);
    }

    emit(event, data) {
        const callbacks = this.events.get(event) || [];
        callbacks.forEach(cb => cb(data));
    }

    emitBlockMined(block) {
        this.emit("block_mined", block);
    }

    emitTransactionSent(tx) {
        this.emit("transaction_sent", tx);
    }
}

module.exports = ChainEventEmitter;
