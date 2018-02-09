// import { generateAccount } from './accountgen.js';
import { generateAccount } from './accountgen.js';

const ACCOUNTS = [];

for(let i = 0; i < 30; i++) {
  ACCOUNTS.push(generateAccount());
}

export { ACCOUNTS };
