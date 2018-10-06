// Return a remainder is nonnegative always
export function mod(a: number, b: number): number {
    return a - b * Math.floor(a / b);
}
