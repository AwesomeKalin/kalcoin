import { Block } from "../blockchain/block.js";
import os from 'node:os';
import { chain } from "./daemon.js";

export const blockIndex: Map<string, Block> = new Map();
export const blockIndexNo: Map<number, Block> = new Map();

const genesis: Block = Object.create(Block.prototype);
genesis.block_height = 0;
genesis.timestamp = 1713809452851;
genesis.nonce = 0;
genesis.coinbase_output_address = 'KJe6AFdZTTEZ2BKg9DUgZEL8Mp8J8Pbr2u';
genesis.coinbase_tag = 'Kalcoin, the crappy blockchain to show off Kalhash';
genesis.transactions = [];
genesis.tx_hashes = [];
genesis.block_id = 'a8a8a8a28882882088202a02202a88200000a888a2282220';
genesis.difficulty = 1;
genesis.validPow = true;
genesis.target = 6277101735386680763835789423207666416102355444464034512896n;

blockIndex.set('a8a8a8a28882882088202a02202a88200000a888a2282220', genesis);
blockIndexNo.set(0, genesis);

export let blockNum: number;

console.log('Loading Blocks!');

try {
    blockNum = +await Bun.file(`${os.homedir()}/.kalcoind/blockcount.kal`).text();
} catch {
    blockNum = 0;
    Bun.write(`${os.homedir()}/.kalcoind/blockcount.kal`, '0');
}

for (var i = 1; i < blockNum; i++) {
    try {
        const block: Block = JSON.parse(`${os.homedir()}/.kalcoind/blocks/${i}.kblk`, Object.create(Block.prototype));
        const blockid: string = block.block_id;
        const height: number = block.block_height;
        chain.chain.push(block);
        blockIndex.set(blockid, block);
        blockIndexNo.set(height, block);
    } catch {
        console.error('Attempted to load non-downloaded block. Are you sure that you didn\'t delete any blocks?');
        process.exit(3);
    }
}