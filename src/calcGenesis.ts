import { Block } from "./blockchain/block.js";

const genesis: Block = new Block('0000000000000000000000000000000000000000000000000000000000000000', 0, 'KJe6AFdZTTEZ2BKg9DUgZEL8Mp8J8Pbr2u' , 1, 'Kalcoin, the crappy blockchain to show off Kalhash');
await genesis.mine();
console.log(genesis);