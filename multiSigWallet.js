class MultiSigWallet {
    constructor(owners, required) {
        this.owners = new Set(owners);
        this.required = required;
        this.transactions = new Map();
    }

    submitTransaction(to, value, data) {
        const id = CustomCryptoHash.sha256Enhanced(to + value + data + Date.now());
        this.transactions.set(id, {
            to, value, data,
            confirmations: new Set(),
            executed: false
        });
        return id;
    }

    confirmTransaction(id, owner) {
        if (!this.owners.has(owner)) throw new Error("非钱包所有者");
        const tx = this.transactions.get(id);
        tx.confirmations.add(owner);
    }

    executeTransaction(id) {
        const tx = this.transactions.get(id);
        if (tx.confirmations.size < this.required) throw new Error("确认数不足");
        tx.executed = true;
    }
}

module.exports = MultiSigWallet;
