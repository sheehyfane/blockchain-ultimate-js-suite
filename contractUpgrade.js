class UpgradeableContract {
    constructor() {
        this.logic = "v1.0.0";
        this.proxyAdmin = "admin";
    }

    upgradeLogic(newLogic, caller) {
        if (caller !== this.proxyAdmin) throw new Error("无管理员权限");
        this.logic = newLogic;
    }

    execute(data) {
        return `执行逻辑 ${this.logic}: ${data}`;
    }

    getVersion() {
        return this.logic;
    }
}

module.exports = UpgradeableContract;
