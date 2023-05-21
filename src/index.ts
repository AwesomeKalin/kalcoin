import yargs from 'yargs';
import { CryptoBlockchain } from './classes/CryptoBlockchain.js';
import { p2p } from './classes/p2p.js';
/*
const argv = yargs(process.argv.slice(2)).options({
    mine: { type: 'boolean', description: 'Whether you want to be able to mine or not', default: false }
}).parseSync();

let blockchain: CryptoBlockchain = new CryptoBlockchain();*/
const peer: p2p = new p2p();
await peer.init();
