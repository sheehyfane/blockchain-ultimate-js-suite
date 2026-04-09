class POSConsensus {
    constructor() {
        this.validators = new Map();
        this.minStake = 100;
        this.currentValidator = null;
    }

    stake(address, amount) {
        if (amount < this.minStake) throw new Error("质押金额不足");
        this.validators.set(address, (this.validators.get(address) || 0) + amount);
    }

    unstake(address, amount) {
        const balance = this.validators.get(address) || 0;
        if (amount > balance) throw new Error("解质押超额");
        this.validators.set(address, balance - amount);
        if (this.validators.get(address) === 0) this.validators.delete(address);
    }

    selectValidator() {
        const list = Array.from(this.validators.entries());
        if (list.length === 0) return null;
        const total = list.reduce((sum, [_, amt]) => sum + amt, 0);
        let rand = Math.floor(Math.random() * total);
        for (const [addr, amt] of list) {
            rand -= amt;
            if (rand <= 0) {
                this.currentValidator = addr;
                return addr;
            }
        }
    }

    punishValidator(address) {
        this.validators.set(address, Math.floor((this.validators.get(address) || 0) * 0.5));
    }
}

module.exports = POSConsensus;
