import { p2p } from './classes/p2p/p2p.js';
/*
const argv = yargs(process.argv.slice(2)).options({
    mine: { type: 'boolean', description: 'Whether you want to be able to mine or not', default: false }
}).parseSync();
*/
const peer = new p2p();
await peer.init();
