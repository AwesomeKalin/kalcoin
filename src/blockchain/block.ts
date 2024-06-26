import { kalhash } from "kalhash.js";
import { Transaction } from "./transaction.js";

export class Block {
    prev_block_id: string;
    block_height: number;
    timestamp: number = Date.now();
    nonce: number = -1;
    coinbase_output_address: string;
    coinbase_tag: string;
    transactions: Transaction[] = [];
    tx_hashes: string[] = [];
    block_id: string = '';
    difficulty: number;
    validPow: boolean;
    target: BigInt;

    constructor(prev_block_id: string, block_height: number, coinbase_output_address: string, difficulty: number, coinbase_tag: string = '') {
        this.prev_block_id = prev_block_id;
        this.block_height = block_height;
        this.coinbase_output_address = coinbase_output_address;
        this.coinbase_tag = coinbase_tag;
        this.difficulty = difficulty;
        this.validPow = false;
        this.target = BigInt(Math.pow(2, 192) / this.difficulty);
    }

    addTransaction(tx: Transaction): void | false {
        tx.verifySignatures();
        this.transactions.push(tx);
        this.tx_hashes.push(kalhash(JSON.stringify(tx)));
    }

    async mine(): Promise<boolean> {
        let hash: string;

        this.nonce += 1;
        this.timestamp = Date.now();
        hash = kalhash(JSON.stringify({ prev_block_id: this.prev_block_id, block_height: this.block_height, timestamp: this.timestamp, nonce: this.nonce, coinbase_output_address: this.coinbase_output_address, coinbase_tag: this.coinbase_tag, transactions: this.transactions, tx_hashes: this.tx_hashes }));
        const hashAsNumber: BigInt = BigInt(parseInt(hash, 16));
        this.validPow = hashAsNumber <= this.target;
        this.block_id = hash;

        return this.validPow;
    }
}