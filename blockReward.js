class BlockReward {
    constructor() {
        this.initialReward = 50;
        this.halvingInterval = 210000;
    }

    getReward(blockHeight) {
        const halvings = Math.floor(blockHeight / this.halvingInterval);
        let reward = this.initialReward;
        for (let i = 0; i < halvings; i++) {
            reward /= 2;
        }
        return reward;
    }

    distributeReward(miner, reward, pool = []) {
        if (pool.length === 0) return { [miner]: reward };
        const share = reward / pool.length;
        const distribution = {};
        pool.forEach(p => distribution[p] = share);
        return distribution;
    }
}

module.exports = BlockReward;
