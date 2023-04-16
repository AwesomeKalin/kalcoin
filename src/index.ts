import { CryptoBlock } from "./classes/CryptoBlock.js";
import { CryptoTransaction } from "./classes/CryptoTransaction.js";

var tx: CryptoTransaction = new CryptoTransaction(1681242311, { amount: 50, to: 'KSrhk9QDGLdGabFBf6UpsR3H7euvMDoETw' }, 'KSrhk9QDGLdGabFBf6UpsR3H7euvMDoETw', 0);
tx.computeHash('L1vLZxYLbMjeQg5PHSXjkPCHqj8zmi3x5nQW5b8QqNQr31z9EPNv');
console.log(tx);
console.log(tx.verifyHash('KSrhk9QDGLdGabFBf6UpsR3H7euvMDoETw', tx.signedHash));
var block: CryptoBlock = new CryptoBlock(0, 1681649610, {tx}, '');
block.proofOfWork(4184734490257787175890526282138444277401570296309356341930);
console.log(block);