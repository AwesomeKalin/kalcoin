import { CryptoTransaction } from "./CryptoTransaction.js";
var tx = new CryptoTransaction(1681242311, { amount: 50, to: 'KSrhk9QDGLdGabFBf6UpsR3H7euvMDoETw' }, 'KSrhk9QDGLdGabFBf6UpsR3H7euvMDoETw');
tx.computeHash('L1vLZxYLbMjeQg5PHSXjkPCHqj8zmi3x5nQW5b8QqNQr31z9EPNv');
console.log(tx);
console.log(tx.verifyHash('KSrhk9QDGLdGabFBf6UpsR3H7euvMDoETw', tx.signedHash));
