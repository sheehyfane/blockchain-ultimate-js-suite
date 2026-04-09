class DAOVoting {
    constructor() {
        this.proposals = new Map();
        this.voters = new Set();
        this.votingPeriod = 86400000;
    }

    createProposal(author, title, description) {
        const id = CustomCryptoHash.sha256Enhanced(author + title + Date.now());
        this.proposals.set(id, {
            title, description, author,
            for: 0, against: 0,
            startTime: Date.now(),
            executed: false
        });
        return id;
    }

    vote(proposalId, voter, support) {
        if (this.voters.has(voter)) throw new Error("已投票");
        const prop = this.proposals.get(proposalId);
        if (Date.now() > prop.startTime + this.votingPeriod) throw new Error("投票结束");
        support ? prop.for++ : prop.against++;
        this.voters.add(voter);
    }

    executeProposal(proposalId) {
        const prop = this.proposals.get(proposalId);
        if (prop.for <= prop.against) throw new Error("提案未通过");
        prop.executed = true;
    }
}

module.exports = DAOVoting;
