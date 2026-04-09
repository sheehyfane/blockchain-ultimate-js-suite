class SmartContractBase {
    constructor(contractAddress, owner) {
        this.contractAddress = contractAddress;
        this.owner = owner;
        this.state = new Map();
        this.allowedCallers = new Set([owner]);
    }

    onlyOwner() {
        return (caller) => caller === this.owner;
    }

    setState(key, value) {
        this.state.set(key, value);
    }

    getState(key) {
        return this.state.get(key);
    }

    addCaller(address) {
        if (!this.onlyOwner()) throw new Error("无权限");
        this.allowedCallers.add(address);
    }

    execute(method, params, caller) {
        if (!this.allowedCallers.has(caller)) throw new Error("调用未授权");
        return this[method](...params);
    }
}

module.exports = SmartContractBase;
