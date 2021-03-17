import RNG from '.';

describe('Mersenne Twister Algorithm', () => {
    const iterate = (rng: RNG, iteration: number) => {
        for (let i = 0; i < iteration; i++) {
            rng.nextInt();
        }
    };

    it('Use current timestamp (in second) as default seed', () => {
        const rng = new RNG();
        // Lock Time
        const dateNowSpy = jest
            .spyOn(Date, 'now')
            .mockImplementation(() => 1487076708000);
        expect(rng.nextInt()).toEqual(162847484);
        dateNowSpy.mockRestore();
    });

    it('Handle regular seed', () => {
        const rng = new RNG();
        rng.setSeed(1447375907);
        expect(rng.nextInt()).toEqual(4254233790);
        // Skip 4 times
        iterate(rng, 4);
        expect(rng.nextInt()).toEqual(2753506568);
        // Skip 955 times
        iterate(rng, 955);
        expect(rng.nextInt()).toEqual(3142759769);
    });

    it('Handle negative number (-8903471) as a seed', () => {
        const rng = new RNG();
        rng.setSeed(-8903471);
        expect(rng.nextInt()).toEqual(1248869425);
    });

    it('Should match result of -8903471 as seed', () => {
        const rng = new RNG();
        rng.setSeed(4286063825);
        expect(rng.nextInt()).toEqual(1248869425);
    });

    it('Handle decimal number (987110456.89) as a seed', () => {
        const rng = new RNG();
        rng.setSeed(987110456.89);
        expect(rng.nextInt()).toEqual(3627559320);
    });

    it('Should match result of 987110456.89 as seed', () => {
        const rng = new RNG();
        rng.setSeed(987110456);
        expect(rng.nextInt()).toEqual(3627559320);
    });

    it('Generate random float number', () => {
        const rng = new RNG();
        rng.setSeed(1447375907);
        iterate(rng, 1000);
        expect(rng.nextFloat()).toBeCloseTo(0.70676209, 8);
        expect(rng.nextFloat()).toBeCloseTo(0.05191009, 8);
        expect(rng.nextFloat()).toBeCloseTo(0.28660546, 8);
    });

    it('Generate random bytes of given length', () => {
        const rng = new RNG();
        rng.setSeed(1447375907);
        const buf = rng.randomBytes(9);
        expect(buf.toString('hex')).toEqual('be7492fd784ff0aafb');
    });
});
