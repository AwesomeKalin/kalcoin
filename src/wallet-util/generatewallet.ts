import bitcore from 'bitcore-lib';

const privateKey: any = new bitcore.PrivateKey();

const address: string = privateKey.toWIF();

console.log(address);
console.log(privateKey.toPublicKey().toAddress(bitcore.Networks.add({
    name: 'kalcoin',
    pubkeyhash: 0x2D,
    privateKey: 0x1C,
    scriptHash: 0x28,
    port: 50576
})).toString());