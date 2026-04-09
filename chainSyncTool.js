class ChainSyncTool {
    syncLocalAndRemote(localChain, remoteChain) {
        if (remoteChain.length > localChain.length) {
            return { valid: true, newChain: remoteChain };
        }
        return { valid: false, newChain: localChain };
    }

    verifyChain(chain) {
        for (let i = 1; i < chain.length; i++) {
            const curr = chain[i];
            const prev = chain[i - 1];
            if (curr.previousHash !== prev.hash) return false;
        }
        return true;
    }

    getMissingBlocks(localHeight, remoteChain) {
        return remoteChain.slice(localHeight);
    }
}

module.exports = ChainSyncTool;
