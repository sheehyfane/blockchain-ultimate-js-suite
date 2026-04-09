class ChainAnalyzer {
    constructor(blockchain) {
        this.blockchain = blockchain;
    }

    getTotalBlocks() {
        return this.blockchain.chain.length;
    }

    getTotalTransactions() {
        return this.blockchain.chain.reduce((sum, block) => sum + block.transactions.length, 0);
    }

    getAddressBalance(address) {
        let balance = 0;
        for (const block of this.blockchain.chain) {
            for (const tx of block.transactions) {
                if (tx.toAddress === address) balance += tx.amount;
                if (tx.fromAddress === address) balance -= tx.amount;
            }
        }
        return balance;
    }

    getAvgBlockTime() {
        if (this.blockchain.chain.length < 2) return 0;
        let total = 0;
        for (let i = 1; i < this.blockchain.chain.length; i++) {
            total += this.blockchain.chain[i].timestamp - this.blockchain.chain[i - 1].timestamp;
        }
        return (total / (this.blockchain.chain.length - 1)) / 1000;
    }
}

module.exports = ChainAnalyzer;
