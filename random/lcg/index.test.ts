import RandomNumberGenerator from '.';

describe('Test RandomNumberGenerator', () => {
    let rng: RandomNumberGenerator;
    beforeEach(() => {
        rng = new RandomNumberGenerator();
    });

    it('.nextInt() generate a pseudo random int', () => {
        rng.setSeed(3820783849);
        expect(rng.nextInt()).toEqual(1246739764);
        expect(rng.nextInt()).toEqual(1106396931);
        expect(rng.nextInt()).toEqual(223527046);
        expect(rng.nextInt()).toEqual(2943229485);
        expect(rng.nextInt()).toEqual(4151404968);
    });

    it('.nextFloat() generate a pseudo random float bettwen 0 to 1', () => {
        rng.setSeed(4151404968);
        expect(rng.nextFloat()).toEqual(0.3074074329342693);
        expect(rng.nextFloat()).toEqual(0.5933728874661028);
        expect(rng.nextFloat()).toEqual(0.2415774876717478);
        expect(rng.nextFloat()).toEqual(0.0037347888574004173);
        expect(rng.nextFloat()).toEqual(0.8854908372741193);
    });

    it('.randomBytes() given a specific length', () => {
        rng.setSeed(2601234783);
        const buf = rng.randomBytes(20);
        expect(buf.toString('hex')).toEqual(
            '32cff916e9648e2b34e99f0903838c3686cc0fc9'
        );
    });
});
