import { noise } from "@chainsafe/libp2p-noise";
import { tcp } from "@libp2p/tcp";
import { Libp2p, createLibp2p } from "libp2p";
import { mplex } from '@libp2p/mplex';
import { kadDHT } from '@libp2p/kad-dht';
import { webSockets } from '@libp2p/websockets';
import { webTransport } from '@libp2p/webtransport';
import { webRTC } from '@libp2p/webrtc';

export class p2p {
    //@ts-expect-error
    node: Libp2p;

    constructor() {
        var node: any = createLibp2p({
            transports: [tcp(), webSockets(), webTransport(), webRTC()],
            connectionEncryption: [noise()],
            streamMuxers: [mplex()],
            dht: [kadDHT()],
        }).then(async () => {
            this.node = node;
            await node.start();
            console.log('Libp2p started');
            console.log('Listening on:');
            node.getMultiaddrs().forEach((addr: any) => {
                console.log(addr.toString());
            });
        });
        node.contentRouting.provide('1');
    }
}