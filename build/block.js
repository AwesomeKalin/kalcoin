import { kalhash } from "kalhash.js";
export class Block {
    prev_block_id;
    block_height;
    timestamp = Date.now();
    nonce = 0;
    coinbase_output_address;
    coinbase_tag;
    transactions = [];
    tx_hashes = [];
    block_id = '';
    difficulty;
    constructor(prev_block_id, block_height, coinbase_output_address, difficulty, coinbase_tag = '') {
        this.prev_block_id = prev_block_id;
        this.block_height = block_height;
        this.coinbase_output_address = coinbase_output_address;
        this.coinbase_tag = coinbase_tag;
        this.difficulty = difficulty;
    }
    addTransaction(tx) {
        // TODO: Verification code
        this.transactions.push(tx);
        this.tx_hashes.push(kalhash(JSON.stringify(tx)));
    }
    async mine() {
        const target = BigInt(Math.pow(2, 192) / this.difficulty);
        let mined = false;
        this.nonce = -1;
        let hash;
        while (!mined) {
            this.nonce += 1;
            this.timestamp = Date.now();
            hash = kalhash(JSON.stringify({ prev_block_id: this.prev_block_id, block_height: this.block_height, timestamp: this.timestamp, nonce: this.nonce, coinbase_output_address: this.coinbase_output_address, coinbase_tag: this.coinbase_tag, transactions: this.transactions, tx_hashes: this.tx_hashes }));
            const hashAsNumber = BigInt(parseInt(hash, 16));
            mined = hashAsNumber <= target;
        }
        //@ts-expect-error
        this.block_id = hash;
        return;
    }
}
