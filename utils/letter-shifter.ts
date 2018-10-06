import { mod } from './math';

// LowerCaseA equals to ascii code of letter 'a'
export const LowerCaseA = 'a'.charCodeAt(0);
// LowerCaseZ equals to ascii code of letter 'z'
export const LowerCaseZ = 'z'.charCodeAt(0);

// UpperCaseA equals to ascii code of letter 'A'
export const UpperCaseA = 'A'.charCodeAt(0);
// UpperCaseZ equals to ascii code of letter 'Z'
export const UpperCaseZ = 'Z'.charCodeAt(0);

export function isLowerCase(charCode: number): boolean {
    return charCode >= LowerCaseA && charCode <= LowerCaseZ;
}

export function isUpperCase(charCode: number): boolean {
    return charCode >= UpperCaseA && charCode <= UpperCaseZ;
}

export function shiftLetter(charCode: number, shift: number): number {
    const shifted = charCode + shift;

    if (isLowerCase(charCode)) {
        const offset = shifted - LowerCaseA;
        return LowerCaseA + mod(offset, 26);
    }

    if (isUpperCase(charCode)) {
        const offset = shifted - UpperCaseA;
        return UpperCaseA + mod(offset, 26);
    }

    // Keep unchanged
    return charCode;
}
