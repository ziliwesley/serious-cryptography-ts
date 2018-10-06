import { encrypt, encryptClassic, decrypt, decryptClassic } from ".";

describe("Test implementation of caesar cipher", () => {
    it('should handle lower case words', () => {
        expect(encrypt('hello', 1)).toEqual('ifmmp');
        expect(decrypt('ifmmp', 1)).toEqual('hello');
    });

    it('should handle upper case words', () => {
        expect(encryptClassic('CAESAR')).toEqual('FDHVDU');
        expect(decryptClassic('FDHVDU')).toEqual('CAESAR');
    });

    it('should handle words with combined case', () => {
        expect(encrypt('Hello World', 2))
            .toEqual('Jgnnq Yqtnf');
        expect(encrypt('Hello World', 2))
            .toEqual('Jgnnq Yqtnf');
    });

    it('should remains other characters unchanged', () => {
        expect(encryptClassic('Sky 天'))
            .toEqual('Vnb 天');
        expect(decryptClassic('Vnb 天'))
            .toEqual('Sky 天');
    });
})