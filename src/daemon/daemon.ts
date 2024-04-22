import config from '../../config.json';
import { Chain } from '../blockchain/chain.js';

export const chain: Chain = new Chain();

Bun.serve({
    port: config.rpcNode,
    hostname: config.hostname,
    fetch(req) {
        return new Response("404!");
    },
});

console.log(`RPC node running on ${config.hostname}:${config.rpcNode}`);