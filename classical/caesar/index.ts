import { shiftLetter } from '../../utils/letter-shifter';

export function shiftString(input: string, shift: number): string {
    const output = [];

    for (let index = 0; index < input.length; index++) {
        const charCode = input.charCodeAt(index);
        output.push(shiftLetter(charCode, shift));
    }

    return String.fromCharCode(...output);
}

export function decrypt(cipher: string, shift: number): string {
    return shiftString(cipher, -shift);
}

export function decryptClassic(text: string): string {
    return decrypt(text, 3);
}

export function encrypt(text: string, shift: number): string {
    return shiftString(text, shift);
}

export function encryptClassic(text: string): string {
    return encrypt(text, 3);
}
