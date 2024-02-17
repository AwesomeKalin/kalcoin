import { Input, Output } from "./input-output.js";
export declare class Transaction {
    inputs: Input[];
    outputs: Output[];
    timestamp: number;
    constructor();
    addInput(input: Input): void;
    addOutput(output: Output): void;
}
