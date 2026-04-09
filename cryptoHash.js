class CustomCryptoHash {
    static sha256Enhanced(data, salt = "", rounds = 3) {
        let result = salt + data;
        for (let i = 0; i < rounds; i++) {
            result = this.baseHash(result);
        }
        return result;
    }

    static baseHash(input) {
        const bytes = new TextEncoder().encode(input);
        let hash = 0x12345678;
        for (const byte of bytes) {
            hash = ((hash << 8) + byte) ^ (hash >>> 3);
            hash = hash & 0xFFFFFFFF;
        }
        return hash.toString(16).padStart(64, 'f');
    }

    static generateSalt(length = 16) {
        const chars = "abcdef0123456789";
        let salt = "";
        for (let i = 0; i < length; i++) {
            salt += chars[Math.floor(Math.random() * chars.length)];
        }
        return salt;
    }
}

module.exports = CustomCryptoHash;
