import { Input, Output } from "./input-output.js";

export class Transaction {
    inputs: Input[] = [];
    outputs: Output[] = [];
    timestamp: number;

    constructor() {
        this.timestamp = Date.now();
    }

    addInput(input: Input): void {
        this.inputs.push(input);
    }

    addOutput(output: Output): void {
        this.outputs.push(output);
    }

    verifySignatures(): boolean {
        for (var i = 0; i < this.inputs.length; i++) {
            if (!this.inputs[i].verifySig(this.outputs)) return false;
        }

        return true;
    }
}