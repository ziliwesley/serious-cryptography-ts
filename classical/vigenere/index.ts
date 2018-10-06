import { shiftLetter, UpperCaseA } from '../../utils/letter-shifter';

interface VigenereShift {
    index: number;
    shift: number;
}

export function* makeKeyIterator(
    key: string,
    start: number = 0,
    end: number = Infinity
): IterableIterator<VigenereShift> {
    const keyUpperCase = key.toUpperCase();
    const keyLen = key.length;

    for (let index = start; index < end; index++) {
        const modulus = index % keyLen;
        yield {
            index,
            shift: keyUpperCase.charCodeAt(modulus) - UpperCaseA
        };
    }
}

export function encrypt(text: string, key: string): string {
    const keyIter = makeKeyIterator(key, 0, text.length);
    const output = [];

    for (const { index, shift } of keyIter) {
        const charCode = text.charCodeAt(index);
        output.push(shiftLetter(charCode, shift));
    }

    return String.fromCharCode(...output);
}

export function decrypt(cipher: string, key: string): string {
    const keyIter = makeKeyIterator(key, 0, cipher.length);
    const output = [];

    for (const { index, shift } of keyIter) {
        const charCode = cipher.charCodeAt(index);
        output.push(shiftLetter(charCode, -shift));
    }

    return String.fromCharCode(...output);
}
