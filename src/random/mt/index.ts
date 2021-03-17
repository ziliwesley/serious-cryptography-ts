import { RandomNumberGenerator } from '../../random/random.interface';
import { toUint32 } from '../../common/util/number';

// tslint:disable:object-literal-sort-keys
// Coefficients of MT19937
const COEFFICIENTS = {
  // word size (in number of bits)
  W: 32,
  // degree of recurrence
  N: 624,
  // middle word, an offset used in the recurrence relation defining the series
  // x, 1 ≤ m < n
  M: 397,
  // separation point of one word, or the number of bits of the lower bitmask,
  // 0 ≤ r ≤ w - 1
  R: 31,
  // coefficients of the rational normal form twist matrix
  A: 0x9908b0df,
  // TGFSR(R) tempering bitmasks
  B: 0x9d2c5680,
  C: 0xefc60000,
  // TGFSR(R) tempering bit shifts
  S: 7,
  T: 15,
  // additional Mersenne Twister tempering bit shifts/masks
  U: 11,
  D: 0xffffffff,
  L: 18
};

// most significant w-r bits
// 0x80000000 (w = 32, r = 31)
const UPPER_MASK = toUint32(1 << COEFFICIENTS.R);
// least significant r bits
// 0x7fffffff (w = 32, r = 31)
const LOWER_MASK = ~UPPER_MASK;

// xA = x >> 1 if x0 === 0
// xA = (x >> 1) XOR A if x0 === 1
// where x0 is the lowest order bit of x
const TWIST_MATRIX = new Uint32Array([0x0, COEFFICIENTS.A]);

export function concatBits(x: number, y: number): number {
  return (x & UPPER_MASK) | (y & LOWER_MASK);
}

export function twist(xa: number, xb: number, xm: number): number {
  const t = concatBits(xa, xb);
  return xm ^ (t >>> 1) ^ TWIST_MATRIX[t & 0x1];
}

export function temper(x: number): number {
  let y: number = x;
  // y := x XOR ((x >> u) & d)
  y ^= y >>> COEFFICIENTS.U;
  // y := y XOR ((y << s) & b)
  y ^= (y << COEFFICIENTS.S) & COEFFICIENTS.B;
  // y := y XOR ((y << t) & c)
  y ^= (y << COEFFICIENTS.T) & COEFFICIENTS.C;
  // z := y XOR (y >> l)
  y ^= y >>> COEFFICIENTS.L;

  return toUint32(y);
}

/**
 * MT19937
 * Original C-Program: http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/MT2002/CODES/mt19937ar.c
 * Wikipedia: https://en.wikipedia.org/wiki/Mersenne_Twister
 */
export default class MersenneTwister implements RandomNumberGenerator {
  private state: Uint32Array = new Uint32Array(COEFFICIENTS.N);
  private nextIndex: number = COEFFICIENTS.N + 1;

  get initialized(): boolean {
    // mti === N+1 means mt[N] is not initialized
    return this.nextIndex !== COEFFICIENTS.N + 1;
  }

  /**
   * Generates a random number on [0,0xffffffff]-interval
   */
  public nextInt(): number {
    let k;

    if (this.nextIndex >= COEFFICIENTS.N) {
      if (!this.initialized) {
        // Current timestamp will be used as default seed
        // if not initialized yet
        this.setSeed(Date.now() / 1000);
      }

      for (k = 0; k < COEFFICIENTS.N - COEFFICIENTS.M; k++) {
        this.state[k] = twist(
          this.state[k],
          this.state[k + 1],
          this.state[k + COEFFICIENTS.M]
        );
      }

      for (; k < COEFFICIENTS.N - 1; k++) {
        this.state[k] = twist(
          this.state[k],
          this.state[k + 1],
          this.state[k + (COEFFICIENTS.M - COEFFICIENTS.N)]
        );
      }

      this.state[COEFFICIENTS.N - 1] = twist(
        this.state[COEFFICIENTS.M - 1],
        this.state[0],
        this.state[COEFFICIENTS.M - 1]
      );

      this.nextIndex = 0;
    }

    return temper(this.state[this.nextIndex++]);
  }

  /**
   * Generates a random number on [0,1)-real-interval
   */
  public nextFloat(): number {
    // divided by 2^32
    return this.nextInt() / 4294967296;
  }

  /**
   * initializes mt[N] with a number as the seed
   * @param seed
   */
  public setSeed(seed: number): void {
    this.state[0] = seed;

    // Initialize internal state
    for (
      this.nextIndex = 1;
      this.nextIndex < this.state.length;
      this.nextIndex++
    ) {
      // l = mt[mti - 1] XOR (mt[mti - 1] >> 30)
      const l =
        this.state[this.nextIndex - 1] ^
        (this.state[this.nextIndex - 1] >>> 30);
      // 1812433253UL * l + mti
      this.state[this.nextIndex] =
        ((((l & 0xffff0000) >>> 16) * 1812433253) << 16) +
        (l & 0x0000ffff) * 1812433253 +
        this.nextIndex;
      // mt[mti] &= 0xffffffffUL;
      // This step is optional since only 32-bits will be kept in an Uint32Array
    }
  }

  /**
   * Generate random bytes with given length
   * @param length length of bytes generated
   */
  public randomBytes(length: number): Buffer {
    const randomUint32Needed = Math.ceil(length / 4);
    const targetBuffer = Buffer.allocUnsafe(randomUint32Needed * 4);

    for (let index = 0; index < randomUint32Needed; index++) {
      const randomUint32 = this.nextInt();
      targetBuffer.writeUInt32LE(randomUint32, index * 4);
    }

    return targetBuffer.slice(0, length);
  }
}
