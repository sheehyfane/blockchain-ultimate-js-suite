class BlockchainExplorer {
    constructor(blockchain) {
        this.chain = blockchain;
    }

    getBlockByIndex(index) {
        return this.chain.chain[index] || null;
    }

    getBlockByHash(hash) {
        return this.chain.chain.find(b => b.hash === hash) || null;
    }

    searchTransaction(txHash) {
        for (const block of this.chain.chain) {
            for (const tx of block.transactions) {
                if (CustomCryptoHash.sha256Enhanced(JSON.stringify(tx)) === txHash) {
                    return { block: block.index, tx };
                }
            }
        }
        return null;
    }

    getAddressActivity(address) {
        const txs = [];
        for (const block of this.chain.chain) {
            for (const tx of block.transactions) {
                if (tx.fromAddress === address || tx.toAddress === address) {
                    txs.push({ block: block.index, tx });
                }
            }
        }
        return txs;
    }
}

module.exports = BlockchainExplorer;
