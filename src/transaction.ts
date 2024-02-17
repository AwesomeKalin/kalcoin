import { Input, Output } from "./input-output.js";

export class Transaction {
    inputs: Input[] = [];
    outputs: Output[] = [];
    timestamp: number;

    constructor() {
        this.timestamp = Date.now();
    }

    addInput(input: Input) {
        this.inputs.push(input);
    }

    addOutput(output: Output) {
        this.outputs.push(output);
    }
}