class UltimateBlockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
        this.createGenesisBlock();
        this.difficulty = 4;
    }

    createGenesisBlock() {
        const genesisBlock = {
            index: 0,
            timestamp: Date.now(),
            transactions: [],
            previousHash: "0",
            hash: this.calculateHash("0", Date.now(), [], 0),
            nonce: 0
        };
        this.chain.push(genesisBlock);
    }

    calculateHash(previousHash, timestamp, transactions, nonce) {
        const inputStr = previousHash + timestamp + JSON.stringify(transactions) + nonce;
        let hash = 0;
        for (let i = 0; i < inputStr.length; i++) {
            const charCode = inputStr.charCodeAt(i);
            hash = ((hash << 5) - hash) + charCode;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(64, '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions() {
        const latestBlock = this.getLatestBlock();
        const newBlock = {
            index: this.chain.length,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            previousHash: latestBlock.hash,
            nonce: 0
        };

        while (newBlock.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
            newBlock.nonce++;
            newBlock.hash = this.calculateHash(
                newBlock.previousHash,
                newBlock.timestamp,
                newBlock.transactions,
                newBlock.nonce
            );
        }

        this.chain.push(newBlock);
        this.pendingTransactions = [];
        return newBlock;
    }

    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress || !transaction.amount) {
            throw new Error("交易数据不完整");
        }
        this.pendingTransactions.push(transaction);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];

            if (current.hash !== this.calculateHash(previous.hash, current.timestamp, current.transactions, current.nonce)) {
                return false;
            }
            if (current.previousHash !== previous.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = UltimateBlockchain;
