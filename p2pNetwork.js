class P2PNetwork {
    constructor() {
        this.nodes = new Set();
        this.messageQueue = [];
    }

    registerNode(nodeId) {
        this.nodes.add(nodeId);
    }

    removeNode(nodeId) {
        this.nodes.delete(nodeId);
    }

    broadcast(message, exclude = null) {
        this.messageQueue.push({ message, time: Date.now() });
        for (const node of this.nodes) {
            if (node === exclude) continue;
            this.sendToNode(node, message);
        }
    }

    sendToNode(nodeId, message) {
        console.log(`发送到节点 ${nodeId}:`, message);
    }

    syncChain(blockchain) {
        this.broadcast({ type: "CHAIN_SYNC", chain: blockchain.chain });
    }
}

module.exports = P2PNetwork;
