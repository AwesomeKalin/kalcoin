import { noise } from "@chainsafe/libp2p-noise";
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
import { identifyService } from "libp2p/identify";
import { p2pMessage } from "./p2pMessage.js";
import { pipe } from 'it-pipe';

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
                identify: identifyService(),
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
                listen: [`/ip4/0.0.0.0/tcp/${Math.floor(Math.random() * (65535 - 1024 + 1) + 1024).toString()}`]
            },
        });
    }

    async init(): Promise<void> {
        this.node = await Promise.resolve(this.node);
        await this.node.start();
        console.log(this.node.peerId);

        this.node.handle('/kalcoin/1.0.0', ({ stream }: { stream: any }) => {
            console.log('Recieved message from peer')
            pipe(
                stream,
                source => (async function () {
                  for await (const msg of source) {
                    console.log(msg.toString());
                  }
                })()
              );
        });
    }

    async sendData(data: p2pMessage): Promise<void> {
        this.node = await Promise.resolve(this.node);
        console.log(this.node.getProtocols());
        console.log(this.node.getPeers());
        for (var i = 0; i > this.node.getPeers().length; i++) {
            const stream = await this.node.dialProtocol(this.node.getPeers()[i], '/kalcoin/1.0.0');
            pipe([Buffer.from('Test')], stream);
        }
    }
}