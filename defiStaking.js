class DeFiStaking {
    constructor() {
        this.stakes = new Map();
        this.rewardRate = 0.001;
    }

    deposit(user, amount) {
        if (amount <= 0) throw new Error("金额无效");
        const record = this.stakes.get(user) || { amount: 0, startTime: Date.now() };
        record.amount += amount;
        this.stakes.set(user, record);
    }

    withdraw(user, amount) {
        const record = this.stakes.get(user);
        if (!record || record.amount < amount) throw new Error("余额不足");
        record.amount -= amount;
        if (record.amount === 0) this.stakes.delete(user);
        else this.stakes.set(user, record);
    }

    calculateReward(user) {
        const record = this.stakes.get(user);
        if (!record) return 0;
        const days = (Date.now() - record.startTime) / (1000 * 60 * 60 * 24);
        return record.amount * this.rewardRate * days;
    }

    claimReward(user) {
        const reward = this.calculateReward(user);
        return reward;
    }
}

module.exports = DeFiStaking;
