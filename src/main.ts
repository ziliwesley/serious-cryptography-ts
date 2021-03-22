import { decrypt, encrypt } from './classical/caesar';

const cipher = encrypt('Caeser', 3);

console.log(`Cipher is: ${cipher}`);

const plainText = decrypt(cipher, 3);

console.log(`Original Message was: ${plainText}`);
