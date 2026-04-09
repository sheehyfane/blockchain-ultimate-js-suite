class CrossChainBridge {
    constructor() {
        this.chainMap = new Map();
        this.lockedAssets = new Map();
    }

    registerChain(chainId, rpc) {
        this.chainMap.set(chainId, rpc);
    }

    lockAsset(chainId, user, asset, amount) {
        const key = `${chainId}-${user}-${asset}`;
        this.lockedAssets.set(key, (this.lockedAssets.get(key) || 0) + amount);
    }

    unlockAsset(chainId, user, asset, amount) {
        const key = `${chainId}-${user}-${asset}`;
        const balance = this.lockedAssets.get(key) || 0;
        if (balance < amount) throw new Error("资产不足");
        this.lockedAssets.set(key, balance - amount);
    }

    verifyCrossChain(txData) {
        return !!txData.chainId && !!txData.amount && txData.amount > 0;
    }
}

module.exports = CrossChainBridge;
