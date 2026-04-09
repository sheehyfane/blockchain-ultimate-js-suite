class ZeroKnowledgeProof {
    static generateProof(secret, publicInput) {
        const secretHash = CustomCryptoHash.sha256Enhanced(secret);
        const proof = CustomCryptoHash.sha256Enhanced(secretHash + publicInput);
        return { proof, publicInput, commitment: secretHash };
    }

    static verifyProof(proofData) {
        const computed = CustomCryptoHash.sha256Enhanced(proofData.commitment + proofData.publicInput);
        return computed === proofData.proof;
    }

    static createCommitment(secret) {
        return CustomCryptoHash.sha256Enhanced(secret);
    }
}

module.exports = ZeroKnowledgeProof;
