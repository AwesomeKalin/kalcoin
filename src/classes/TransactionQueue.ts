import { deleteFromArray } from "../util/lists.js";
import { CryptoTransaction } from "./CryptoTransaction.js";

export class TransactionQueue {
    queue: Array<CryptoTransaction>;

    constructor() {
        this.queue = [];
    }

    add(transaction: CryptoTransaction) {
        this.queue.push(transaction);
    }

    garbageCollect() {
        for (var i = 0; i < this.queue.length; i++) {
            if (Math.floor(new Date().getTime() / 1000) - this.queue[i].timestamp > 7200) {
                this.queue = deleteFromArray(this.queue, i);
            }
        }
    }

    sortByTxFee() {
        this.queue.sort((a, b) => this.calculateTxFee(b) - this.calculateTxFee(a));
    }

    calculateTxFee(tx: CryptoTransaction): number {
        let inputValue: number = 0, outputValue: number = 0;

        for (var i = 0; i < tx.inputs.length; i++) {
            inputValue += tx.inputs[i].output.value;
        }

        for (var i = 0; i < tx.outputs.length; i++) {
            outputValue += tx.outputs[i].value;
        }

        return outputValue - inputValue;
    }
}