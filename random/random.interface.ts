export interface RandomNumberGenerator {
    nextInt(): number;
    nextFloat(): number;
    setSeed(seed: number): void;
    randomBytes(length: number): Buffer;
}
