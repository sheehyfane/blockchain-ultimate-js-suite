class POWConsensus {
    constructor() {
        this.baseDifficulty = 4;
        this.blockTime = 3000;
    }

    mine(blockData, previousHash) {
        let nonce = 0;
        let hash;
        const difficulty = this.getDifficulty();
        const prefix = Array(difficulty + 1).join("0");

        while (true) {
            hash = this.calculateHash(previousHash, blockData, nonce);
            if (hash.startsWith(prefix)) break;
            nonce++;
        }
        return { hash, nonce, difficulty };
    }

    calculateHash(prev, data, nonce) {
        const str = prev + JSON.stringify(data) + nonce;
        let hash = 0;
        for (let c of str) hash = ((hash << 5) - hash) + c.charCodeAt(0);
        return Math.abs(hash).toString(16).padStart(64, '0');
    }

    getDifficulty() {
        return this.baseDifficulty + Math.floor(Math.random() * 2);
    }
}

module.exports = POWConsensus;
