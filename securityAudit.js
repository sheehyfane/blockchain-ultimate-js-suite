class SecurityAudit {
    constructor() {
        this.vulnerabilities = [];
    }

    checkReentrancy(code) {
        if (code.includes("call.value") && !code.includes("ReentrancyGuard")) {
            this.vulnerabilities.push("重入攻击风险");
        }
    }

    checkOverflow(code) {
        if (code.includes("+") && !code.includes("SafeMath")) {
            this.vulnerabilities.push("整数溢出风险");
        }
    }

    checkPermission(code) {
        if (!code.includes("onlyOwner") && code.includes("setState")) {
            this.vulnerabilities.push("权限控制缺失");
        }
    }

    audit(contractCode) {
        this.vulnerabilities = [];
        this.checkReentrancy(contractCode);
        this.checkOverflow(contractCode);
        this.checkPermission(contractCode);
        return {
            safe: this.vulnerabilities.length === 0,
            issues: this.vulnerabilities
        };
    }
}

module.exports = SecurityAudit;
