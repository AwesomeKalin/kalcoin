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
        this.queue.sort((a, b) => b.txFee - a.txFee);
    }
}