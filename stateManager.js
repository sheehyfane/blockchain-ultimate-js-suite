class StateManager {
    constructor() {
        this.state = new Map();
        this.snapshots = new Map();
    }

    updateState(key, value) {
        this.state.set(key, value);
    }

    getState(key) {
        return this.state.get(key);
    }

    takeSnapshot(id) {
        this.snapshots.set(id, new Map(this.state));
    }

    rollbackSnapshot(id) {
        const snapshot = this.snapshots.get(id);
        if (!snapshot) throw new Error("快照不存在");
        this.state = new Map(snapshot);
    }

    clearSnapshots() {
        this.snapshots.clear();
    }
}

module.exports = StateManager;
