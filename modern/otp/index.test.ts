import { decrypt, encrypt } from '.';

describe('Test One-time pad cipher', () => {
    it('encrypt() should work with a key of hex string', () => {
        expect(encrypt('hello', '545e028120').toString('hex')).toEqual(
            '3c3b6eed4f'
        );
    });

    it('encrypt() should work with a key of buffer', () => {
        const buf = Buffer.from('545e028120', 'hex');
        expect(encrypt('hello', buf).toString('hex')).toEqual('3c3b6eed4f');
    });

    it('encrypt() should work with a key of number as seed', () => {
        expect(encrypt('destiny', 1538754611).toString('hex')).toEqual(
            '924a7326b408ea'
        );
    });

    it('encrypt() should throw error if invalid key supplied', () => {
        expect(() => {
            encrypt('destiny', 'random non-hex string');
        }).toThrow(
            'encrypt(): Expect the length of key to be 7, got 0 instead'
        );

        expect(() => {
            encrypt('destiny', '1a2b3c4d5f');
        }).toThrow(
            'encrypt(): Expect the length of key to be 7, got 5 instead'
        );

        expect(() => {
            encrypt('destiny', Buffer.alloc(10));
        }).toThrow(
            'encrypt(): Expect the length of key to be 7, got 10 instead'
        );
    });

    it('decrypt() should work with a key of hex string', () => {
        const cBuf = Buffer.from('3c3b6eed4f', 'hex');
        expect(decrypt(cBuf, '545e028120')).toEqual('hello');
        expect(decrypt('3c3b6eed4f', '545e028120')).toEqual('hello');
    });

    it('decrypt() should work with a key of buffer', () => {
        const cBuf = Buffer.from('3c3b6eed4f', 'hex');
        const kBuf = Buffer.from('545e028120', 'hex');
        expect(decrypt(cBuf, kBuf)).toEqual('hello');
        expect(decrypt('3c3b6eed4f', kBuf)).toEqual('hello');
    });

    it('decrypt() should work with a key of number as seed', () => {
        const cBuf = Buffer.from('924a7326b408ea', 'hex');
        expect(decrypt(cBuf, 1538754611)).toEqual('destiny');
        expect(decrypt('924a7326b408ea', 1538754611)).toEqual('destiny');
    });

    it('decrypt() should throw error if invalid key supplied', () => {
        expect(() => {
            decrypt('3c3b6eed4f', 'random non-hex string');
        }).toThrow(
            'decrypt(): Expect the length of key to be 5, got 0 instead'
        );

        expect(() => {
            decrypt('3c3b6eed4f', '1a2b3c4d');
        }).toThrow(
            'decrypt(): Expect the length of key to be 5, got 4 instead'
        );

        expect(() => {
            decrypt('924a7326b408ea', Buffer.alloc(15));
        }).toThrow(
            'decrypt(): Expect the length of key to be 7, got 15 instead'
        );
    });
});
