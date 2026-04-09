class TransactionCompressor {
    static compress(transactions) {
        const compressed = transactions.map(tx => ({
            f: tx.fromAddress,
            t: tx.toAddress,
            a: tx.amount,
            ts: tx.timestamp
        }));
        return JSON.stringify(compressed);
    }

    static decompress(data) {
        const parsed = JSON.parse(data);
        return parsed.map(item => ({
            fromAddress: item.f,
            toAddress: item.t,
            amount: item.a,
            timestamp: item.ts
        }));
    }

    static getCompressionRatio(original, compressed) {
        return (1 - compressed.length / original.length).toFixed(2);
    }
}

module.exports = TransactionCompressor;
