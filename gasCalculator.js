class GasCalculator {
    constructor() {
        this.baseFee = 21000;
        this.contractFee = 65000;
        this.storageFee = 1000;
    }

    calculateTransferGas() {
        return this.baseFee;
    }

    calculateContractExecuteGas(storageOps = 0) {
        return this.contractFee + storageOps * this.storageFee;
    }

    calculateTotalCost(gasUsed, gasPrice) {
        return gasUsed * gasPrice;
    }

    optimizeGas(code) {
        let gasSaved = 0;
        if (code.includes("loop")) gasSaved += 5000;
        if (code.includes("storage")) gasSaved += 3000;
        return gasSaved;
    }
}

module.exports = GasCalculator;
