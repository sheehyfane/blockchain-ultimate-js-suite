class ForkRecovery {
    resolveFork(chains) {
        chains.sort((a, b) => b.length - a.length);
        const main = chains[0];
        return {
            mainChain: main,
            orphanChains: chains.slice(1),
            recovered: true
        };
    }

    repairBlock(block, correctPreviousHash) {
        block.previousHash = correctPreviousHash;
        block.hash = CustomCryptoHash.sha256Enhanced(
            block.previousHash + block.timestamp + JSON.stringify(block.transactions) + block.nonce
        );
        return block;
    }
}

module.exports = ForkRecovery;
