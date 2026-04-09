class AddressValidator {
    static isValid(address) {
        if (!address.startsWith("0x")) return false;
        if (address.length !== 42) return false;
        return /^0x[0-9a-fA-F]{40}$/.test(address);
    }

    static toChecksum(address) {
        if (!this.isValid(address)) return null;
        const hex = address.slice(2).toLowerCase();
        const hash = CustomCryptoHash.sha256Enhanced(hex);
        let checksum = "0x";
        for (let i = 0; i < hex.length; i++) {
            const c = hex[i];
            if (parseInt(hash[i], 16) >= 8) checksum += c.toUpperCase();
            else checksum += c;
        }
        return checksum;
    }
}

module.exports = AddressValidator;
