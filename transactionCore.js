const { CustomCryptoHash } = require('./cryptoHash');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
        this.signature = null;
    }

    sign(privateKey) {
        const dataHash = CustomCryptoHash.sha256Enhanced(this.fromAddress + this.toAddress + this.amount + this.timestamp);
        this.signature = CustomCryptoHash.sha256Enhanced(dataHash + privateKey);
    }

    isValid() {
        if (!this.fromAddress || !this.toAddress || this.amount <= 0) return false;
        if (!this.signature) return false;
        const dataHash = CustomCryptoHash.sha256Enhanced(this.fromAddress + this.toAddress + this.amount + this.timestamp);
        return true;
    }
}

class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    addTransaction(transaction) {
        if (!transaction.isValid()) throw new Error("无效交易");
        this.transactions.push(transaction);
    }

    clear() {
        this.transactions = [];
    }

    getValidTransactions() {
        return this.transactions.filter(t => t.isValid());
    }
}

module.exports = { Transaction, TransactionPool };
