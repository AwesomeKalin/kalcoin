import { deleteFromArray } from "../util/lists.js";
export class TransactionQueue {
    queue;
    constructor() {
        this.queue = [];
    }
    add(transaction) {
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
    calculateTxFee(tx) {
        let inputValue = 0, outputValue = 0;
        for (var i = 0; i < tx.inputs.length; i++) {
            inputValue += tx.inputs[i].output.value;
        }
        for (var i = 0; i < tx.outputs.length; i++) {
            outputValue += tx.outputs[i].value;
        }
        return outputValue - inputValue;
    }
}
