class BlockchainBenchmark {
    constructor(blockchain) {
        this.chain = blockchain;
    }

    testTPS(iterations = 1000) {
        const start = Date.now();
        for (let i = 0; i < iterations; i++) {
            this.chain.addTransaction({ fromAddress: "A", toAddress: "B", amount: 1 });
        }
        this.chain.minePendingTransactions();
        const duration = (Date.now() - start) / 1000;
        return (iterations / duration).toFixed(2);
    }

    testBlockTime() {
        const times = [];
        for (let i = 1; i < this.chain.chain.length; i++) {
            times.push(this.chain.chain[i].timestamp - this.chain.chain[i - 1].timestamp);
        }
        return times.length ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2) : 0;
    }

    fullReport() {
        return {
            tps: this.testTPS(),
            avgBlockMs: this.testBlockTime(),
            totalBlocks: this.chain.chain.length
        };
    }
}

module.exports = BlockchainBenchmark;
