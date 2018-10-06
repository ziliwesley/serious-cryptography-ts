import { encrypt, decrypt } from ".";

describe('Test implementation of vigenere cipher', () => {
    it('should encrypt P as expected', () => {
        expect(encrypt('TheyDrinkTheTea', 'DUH')).toEqual('WblbXylhrWblWyh')
        expect(encrypt('TheyDrinkTheTea', 'dUh')).toEqual('WblbXylhrWblWyh')
    });

    it('should leave other characters unchanged', () => {
        expect(encrypt('Hello 世界, From TypeScript', 'Mine')).toEqual('Tmypa 世界, Svau XkxrWozvtf')
    });

    it('should decrypt C as expected', () => {
        expect(decrypt('WblbXylhrWblWyh', 'DUH')).toEqual('TheyDrinkTheTea')
        expect(decrypt('WblbXylhrWblWyh', 'dUh')).toEqual('TheyDrinkTheTea')
    });

    it('should leave other characters unchanged', () => {
        expect(decrypt('Tmypa 世界, Svau XkxrWozvtf', 'Mine')).toEqual('Hello 世界, From TypeScript')
    });
});