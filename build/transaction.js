export class Transaction {
    inputs = [];
    outputs = [];
    timestamp;
    constructor() {
        this.timestamp = Date.now();
    }
    addInput(input) {
        this.inputs.push(input);
    }
    addOutput(output) {
        this.outputs.push(output);
    }
}
