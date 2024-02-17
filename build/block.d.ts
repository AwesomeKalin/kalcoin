import { Transaction } from "./transaction.js";
export declare class Block {
    prev_block_id: string;
    block_height: number;
    timestamp: number;
    nonce: number;
    coinbase_output_address: string;
    coinbase_tag: string;
    transactions: Transaction[];
    tx_hashes: string[];
    block_id: string;
    difficulty: number;
    constructor(prev_block_id: string, block_height: number, coinbase_output_address: string, difficulty: number, coinbase_tag?: string);
    addTransaction(tx: Transaction): void;
    mine(): Promise<void>;
}
