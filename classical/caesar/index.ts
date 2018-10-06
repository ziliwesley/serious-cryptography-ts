import { shiftLetter } from "../../utils/letter-shifter";

export function shiftString(input: string, shift: number) {
    const output = [];

    for (let index = 0; index < input.length; index++) {
        const charCode = input.charCodeAt(index);
        output.push(shiftLetter(charCode, shift));
    }

    return String.fromCharCode(...output);
}

export function decrypt(cipher: string, shift: number) {
    return shiftString(cipher, -shift);
}

export function decryptClassic(text: string) {
    return decrypt(text, 3);
}

export function encrypt(text: string, shift: number) {
    return shiftString(text, shift);
}

export function encryptClassic(text: string) {
    return encrypt(text, 3);
}
