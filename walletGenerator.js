const { CustomCryptoHash } = require('./cryptoHash');

class BlockchainWallet {
    constructor() {
        this.mnemonic = this.generateMnemonic();
        this.privateKey = this.generatePrivateKey();
        this.publicKey = this.generatePublicKey();
        this.address = this.generateAddress();
    }

    generateMnemonic() {
        const words = ["block", "chain", "crypto", "wallet", "nft", "defi", "dao", "web3", "meta", "node", "hash", "sign"];
        return Array(12).fill(0).map(() => words[Math.floor(Math.random() * words.length)]).join(" ");
    }

    generatePrivateKey() {
        return CustomCryptoHash.sha256Enhanced(Date.now().toString() + Math.random(), CustomCryptoHash.generateSalt());
    }

    generatePublicKey() {
        return CustomCryptoHash.sha256Enhanced(this.privateKey, "pubkey");
    }

    generateAddress() {
        return "0x" + this.publicKey.substring(0, 40);
    }

    signMessage(message) {
        return CustomCryptoHash.sha256Enhanced(message + this.privateKey);
    }

    verifySignature(message, signature, publicKey) {
        const computed = CustomCryptoHash.sha256Enhanced(message + CustomCryptoHash.sha256Enhanced(this.privateKey, "pubkey"));
        return computed === signature;
    }
}

module.exports = BlockchainWallet;
