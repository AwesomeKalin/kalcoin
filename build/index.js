import yargs from 'yargs';
import { p2p } from './classes/p2p/p2p.js';
import { p2pMessage } from './classes/p2p/p2pMessage.js';
import { CryptoTransaction } from './classes/CryptoTransaction.js';
import { CryptoOutput } from './classes/CryptoOutput.js';
const argv = yargs(process.argv.slice(2)).options({
    mine: { type: 'boolean', description: 'Whether you want to be able to mine or not', default: false }
}).parseSync();
const peer = new p2p();
await peer.init();
setTimeout(() => {
    console.log('Sent message to peer');
    peer.sendData(new p2pMessage('test', new CryptoTransaction(1688132286, ['L3MEj7pnCxzigXLUHeSxyJ5gsBioE9PwyLGvvNo4WYPUFpP9rzdq'], [new CryptoOutput('KTXRPHvj3HrsEZ8fQ6twqemP2Mc6GbbJYw', 10)], [], [new CryptoOutput('KTXRPHvj3HrsEZ8fQ6twqemP2Mc6GbbJYw', 100)])));
}, 10000);
