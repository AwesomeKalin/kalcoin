import { Block } from "./block";
const genesisBlock = new Block(0, null, Date.now() / 1000, 'Hello world! Kalhash is crap!');
let blockchain = [genesisBlock];
