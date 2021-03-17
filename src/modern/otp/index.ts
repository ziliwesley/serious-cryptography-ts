import RandomNumberGenerator from '../../random/lcg';

interface KeyResult {
    res?: Uint8Array;
    err?: string;
}

function pad(src: Uint8Array, padArr: Uint8Array): Buffer {
    const typedArray = src.map(
        (charCode: number, index: number): number => {
            const key = padArr[index];
            return charCode ^ key;
        }
    );

    return Buffer.from(typedArray.buffer);
}

function resolveKey(
    key: number | Uint8Array | string,
    lengthExpected: number
): KeyResult {
    let buffer: Uint8Array;

    if (typeof key === 'number') {
        const rng = new RandomNumberGenerator();
        rng.setSeed(key);
        buffer = rng.randomBytes(lengthExpected);
    } else if (key instanceof Uint8Array) {
        buffer = key;
    } else {
        buffer = Buffer.from(key, 'hex');
    }

    if (buffer.byteLength !== lengthExpected) {
        return {
            err: `Expect the length of key to be ${lengthExpected}, got ${
                buffer.byteLength
            } instead`
        };
    }

    return {
        res: buffer
    };
}

function resolveCipher(cipher: string | Uint8Array): Uint8Array {
    if (typeof cipher === 'string') {
        return Buffer.from(cipher, 'hex');
    } else {
        return cipher;
    }
}

export function encrypt(text: string, keyBuf: Uint8Array): Buffer;
export function encrypt(text: string, keySeed: number): Buffer;
export function encrypt(text: string, keyHex: string): Buffer;
export function encrypt(text: string, key: any): Buffer {
    const { err, res: buffer } = resolveKey(key, text.length);

    if (err) {
        throw new Error(`encrypt(): ${err}`);
    }

    return pad(Buffer.from(text, 'utf8'), buffer);
}

export function decrypt(cipherBuf: Uint8Array, keyBuf: Uint8Array): string;
export function decrypt(cipherBuf: Uint8Array, keySeed: number): string;
export function decrypt(cipherBuf: Uint8Array, keyHex: string): string;
export function decrypt(cipherHex: string, keyBuf: Uint8Array): string;
export function decrypt(cipherHex: string, keySeed: number): string;
export function decrypt(cipherHex: string, keyHex: string): string;
export function decrypt(cipher: any, key: any): string {
    const cipherBuf = resolveCipher(cipher);
    const { err, res: buffer } = resolveKey(key, cipherBuf.byteLength);

    if (err) {
        throw new Error(`decrypt(): ${err}`);
    }

    const textBuf = pad(cipherBuf, buffer);
    return textBuf.toString('utf8');
}
