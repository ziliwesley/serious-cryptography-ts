import { RandomNumberGenerator } from '../random.interface';

export default class LinearCongruentialGenerator
    implements RandomNumberGenerator {
    constructor(
        // multiplier
        private a: number = 1664525,
        // increment
        private c: number = 1013904223,
        private modulus: number = Math.pow(2, 32),
        public seed: number = Date.now()
    ) {}

    /**
     * nextInt
     */
    public nextInt(): number {
        this.seed = (this.seed * this.a + this.c) % this.modulus;
        return this.seed;
    }

    /**
     * nextFloat
     */
    public nextFloat(): number {
        return this.nextInt() / this.modulus;
    }

    /**
     * setSeed
     */
    public setSeed(seed: number): void {
        this.seed = seed;
    }

    /**
     * randomBytes
     */
    public randomBytes(length: number): Buffer {
        // NOTE: modulus has to be lower or equal to 2^32
        const randomUint32Needed = Math.ceil(length / 4);
        // Allocate without initialize it
        const targetBuffer = Buffer.allocUnsafe(randomUint32Needed * 4);

        for (let index = 0; index < randomUint32Needed; index++) {
            const randomNumber = this.nextInt();
            targetBuffer.writeUInt32LE(randomNumber, index * 4);
        }

        return targetBuffer.slice(0, length);
    }
}
