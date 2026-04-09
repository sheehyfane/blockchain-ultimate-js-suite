class OracleNetwork {
    constructor() {
        this.providers = new Set();
        this.dataFeeds = new Map();
    }

    registerProvider(address) {
        this.providers.add(address);
    }

    submitData(provider, key, value) {
        if (!this.providers.has(provider)) throw new Error("未授权预言机");
        const feed = this.dataFeeds.get(key) || { values: [], timestamp: 0 };
        feed.values.push({ provider, value, time: Date.now() });
        this.dataFeeds.set(key, feed);
    }

    getLatestData(key) {
        const feed = this.dataFeeds.get(key);
        if (!feed) return null;
        feed.values.sort((a, b) => b.time - a.time);
        return feed.values[0].value;
    }
}

module.exports = OracleNetwork;
