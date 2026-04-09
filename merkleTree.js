const { CustomCryptoHash } = require('./cryptoHash');

class MerkleTree {
    constructor(dataList) {
        this.leaves = dataList.map(d => CustomCryptoHash.sha256Enhanced(d));
        this.root = this.buildRoot();
    }

    buildRoot() {
        let nodes = [...this.leaves];
        while (nodes.length > 1) {
            const temp = [];
            for (let i = 0; i < nodes.length; i += 2) {
                const left = nodes[i];
                const right = nodes[i + 1] || left;
                temp.push(CustomCryptoHash.sha256Enhanced(left + right));
            }
            nodes = temp;
        }
        return nodes[0];
    }

    getProof(index) {
        const proof = [];
        let nodes = [...this.leaves];
        let i = index;
        while (nodes.length > 1) {
            const pair = i % 2 === 0 ? i + 1 : i - 1;
            if (pair < nodes.length) proof.push(nodes[pair]);
            i = Math.floor(i / 2);
            nodes = this.nextLevel(nodes);
        }
        return proof;
    }

    nextLevel(nodes) {
        const temp = [];
        for (let i = 0; i < nodes.length; i += 2) {
            const left = nodes[i];
            const right = nodes[i + 1] || left;
            temp.push(CustomCryptoHash.sha256Enhanced(left + right));
        }
        return temp;
    }
}

module.exports = MerkleTree;
