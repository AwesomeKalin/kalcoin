import { CryptoOutput } from "./CryptoOutput.js";
import bitcore from 'bitcore-lib';
//@ts-expect-error
import { kalhash } from 'kalhash.js';

export class CryptoInput {
    output: CryptoOutput;
    signature: string;

    constructor(output: CryptoOutput, privateKey: string, outputsFromTX: Array<CryptoOutput>) {
        this.output = output;
        const address = new bitcore.PrivateKey(privateKey);
        this.signature = new bitcore.Message(kalhash(JSON.stringify(output) + JSON.stringify(outputsFromTX))).sign(address);
    }

    verifyHash(address: string, signature: string, outputsFromTX: Array<CryptoOutput>) {
        const addr: any = new bitcore.Address(address, bitcore.Networks.add({
            name: 'kalcoin',
            pubkeyhash: 0x2D,
            privateKey: 0x1C,
            scriptHash: 0x28,
            port: 50576
        }));
        return new bitcore.Message(kalhash(JSON.stringify(this.output) + JSON.stringify(outputsFromTX)).verify(addr, signature));
    }
}