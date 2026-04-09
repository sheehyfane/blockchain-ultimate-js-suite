class NFTMinter {
    constructor() {
        this.nfts = new Map();
        this.ownerOf = new Map();
        this.tokenId = 1;
    }

    mint(toAddress, metadata) {
        const id = this.tokenId++;
        this.nfts.set(id, { metadata, mintTime: Date.now() });
        this.ownerOf.set(id, toAddress);
        return id;
    }

    transfer(from, to, tokenId) {
        if (this.ownerOf.get(tokenId) !== from) throw new Error("无所有权");
        this.ownerOf.set(tokenId, to);
    }

    getNFT(tokenId) {
        return this.nfts.get(tokenId) || null;
    }

    getOwner(tokenId) {
        return this.ownerOf.get(tokenId) || null;
    }
}

module.exports = NFTMinter;
