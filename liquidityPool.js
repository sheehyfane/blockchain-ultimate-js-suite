class LiquidityPool {
    constructor(tokenA, tokenB) {
        this.tokenA = tokenA;
        this.tokenB = tokenB;
        this.reserveA = 0;
        this.reserveB = 0;
        this.feeRate = 0.003;
    }

    addLiquidity(amountA, amountB) {
        this.reserveA += amountA;
        this.reserveB += amountB;
    }

    removeLiquidity(amountA, amountB) {
        this.reserveA -= amountA;
        this.reserveB -= amountB;
    }

    swapAtoB(amountIn) {
        const fee = amountIn * this.feeRate;
        const amountInWithFee = amountIn - fee;
        const amountOut = (this.reserveB * amountInWithFee) / (this.reserveA + amountInWithFee);
        this.reserveA += amountIn;
        this.reserveB -= amountOut;
        return amountOut;
    }

    getPrice() {
        return this.reserveA / this.reserveB;
    }
}

module.exports = LiquidityPool;
