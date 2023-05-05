import yargs from 'yargs';
const argv = yargs(process.argv.slice(2)).options({
    mine: { type: 'boolean', description: 'Whether you want to be able to mine or not', default: false }
}).parseSync();
