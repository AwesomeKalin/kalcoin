import { noise } from "@chainsafe/libp2p-noise";
import { mplex } from "@libp2p/mplex";
import { tcp } from "@libp2p/tcp";
import { webRTC } from "@libp2p/webrtc";
import { webSockets } from "@libp2p/websockets";
import { webTransport } from "@libp2p/webtransport";
import { createLibp2p } from "libp2p";
import { kadDHT } from "@libp2p/kad-dht";
import { bootstrap } from "@libp2p/bootstrap";
import { identifyService } from 'libp2p/identify';
const node = await createLibp2p({
    transports: [tcp(), webSockets(), webTransport(), webRTC(),],
    connectionEncryption: [noise()],
    streamMuxers: [mplex()],
    services: {
        dht: kadDHT(),
        identify: identifyService(),
    },
    peerDiscovery: [bootstrap({
            list: [
                '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
                '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
                '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
                '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
                '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ'
            ],
            timeout: 1000,
            tagName: 'bootstrap',
            tagValue: 50,
            tagTTL: 120000 // in ms
        }),
        //mdns()
    ],
    addresses: {
        listen: ['/ip4/0.0.0.0/tcp/0']
    },
});
await node.start();
const peerId = node.peerId;
console.log(peerId);
node.addEventListener('peer:discovery', (evt) => {
    console.log('Discovered %s', evt.detail.id.toString()); // Log discovered peer
});
