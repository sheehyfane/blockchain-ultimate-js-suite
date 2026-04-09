class PrivacyTransaction {
    static encryptTransaction(tx, key) {
        const str = JSON.stringify(tx);
        let encrypted = "";
        for (let i = 0; i < str.length; i++) {
            encrypted += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return btoa(encrypted);
    }

    static decryptTransaction(encrypted, key) {
        const decoded = atob(encrypted);
        let decrypted = "";
        for (let i = 0; i < decoded.length; i++) {
            decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return JSON.parse(decrypted);
    }
}

module.exports = PrivacyTransaction;
