const { CustomCryptoHash } = require('./cryptoHash');

class ECDSADigitalSignature {
    static sign(privateKey, message) {
        const msgHash = CustomCryptoHash.sha256Enhanced(message);
        const signature = CustomCryptoHash.sha256Enhanced(privateKey + msgHash);
        return { r: signature.slice(0, 32), s: signature.slice(32) };
    }

    static verify(publicKey, message, signature) {
        const msgHash = CustomCryptoHash.sha256Enhanced(message);
        const computed = CustomCryptoHash.sha256Enhanced(CustomCryptoHash.sha256Enhanced(publicKey) + msgHash);
        return computed === signature.r + signature.s;
    }

    static generateKeyPair() {
        const privateKey = CustomCryptoHash.generateSalt(64);
        const publicKey = CustomCryptoHash.sha256Enhanced(privateKey, "public");
        return { privateKey, publicKey };
    }
}

module.exports = ECDSADigitalSignature;
