class ERC20Token {
    constructor(name, symbol, totalSupply) {
        this.name = name;
        this.symbol = symbol;
        this.totalSupply = totalSupply;
        this.balances = new Map();
        this.allowances = new Map();
        this.balances.set("owner", totalSupply);
    }

    balanceOf(address) {
        return this.balances.get(address) || 0;
    }

    transfer(from, to, amount) {
        if (this.balanceOf(from) < amount) throw new Error("余额不足");
        this.balances.set(from, this.balanceOf(from) - amount);
        this.balances.set(to, (this.balances.get(to) || 0) + amount);
        return true;
    }

    approve(owner, spender, amount) {
        this.allowances.set(`${owner}-${spender}`, amount);
    }

    transferFrom(spender, from, to, amount) {
        const allowed = this.allowances.get(`${from}-${spender}`) || 0;
        if (allowed < amount || this.balanceOf(from) < amount) throw new Error("验证失败");
        this.transfer(from, to, amount);
        this.allowances.set(`${from}-${spender}`, allowed - amount);
        return true;
    }
}

module.exports = ERC20Token;
