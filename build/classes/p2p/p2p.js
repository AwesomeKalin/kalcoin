"use strict";
/*import { noise } from "@chainsafe/libp2p-noise";
import { tcp } from "@libp2p/tcp";
import { Libp2p, createLibp2p } from "libp2p";
import { mplex } from '@libp2p/mplex';
import { kadDHT } from '@libp2p/kad-dht';
import { webSockets } from '@libp2p/websockets';
import { webTransport } from '@libp2p/webtransport';
import { webRTC } from '@libp2p/webrtc';
import { CryptoBlockchain } from "../CryptoBlockchain.js";
import { bootstrap } from "@libp2p/bootstrap";
import { mdns } from '@libp2p/mdns';

export class p2p {
    node: Libp2p | Promise<Libp2p>;
    blockchain: CryptoBlockchain;

    constructor() {
        this.blockchain = new CryptoBlockchain();
        this.node = createLibp2p({
            transports: [tcp(), webSockets(), webTransport(), webRTC()],
            connectionEncryption: [noise()],
            streamMuxers: [mplex()],
            services: {
                dht: kadDHT(),
            },
            peerDiscovery: [bootstrap({
                list: [
                    "/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
                    "/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
                    "/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
                ],
                timeout: 1000, // in ms,
                tagName: 'bootstrap',
                tagValue: 50,
                tagTTL: 120000 // in ms
            }),
            mdns()],
            addresses: {
                listen: ['/ip4/0.0.0.0/tcp/46823']
            },
        });
    }

    async init(): Promise<void> {
        this.node = await Promise.resolve(this.node);
        await this.node.start();
        console.log(this.node.peerId);

        this.node.handle('/kalcoin/1.0.0', async ({ stream }: { stream: any }) => {
            for await (const message of stream) {
                console.log(message);
            }
        })
    }
}*/ 
