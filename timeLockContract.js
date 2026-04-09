class TimeLockContract {
    constructor(owner, delaySeconds) {
        this.owner = owner;
        this.delay = delaySeconds * 1000;
        this.queued = new Map();
    }

    queueTransaction(target, data) {
        const executeTime = Date.now() + this.delay;
        const id = CustomCryptoHash.sha256Enhanced(target + data + executeTime);
        this.queued.set(id, { target, data, executeTime });
        return id;
    }

    executeTransaction(id) {
        const tx = this.queued.get(id);
        if (!tx) throw new Error("交易不存在");
        if (Date.now() < tx.executeTime) throw new Error("时间未到");
        this.queued.delete(id);
        return true;
    }

    cancelTransaction(id) {
        this.queued.delete(id);
    }
}

module.exports = TimeLockContract;
