import { Complex } from "./complex.js";

// fft.js

/**
 * @param {number} n 
 * @returns {number}
 */
function nextPowerOf2(n) {
    if (n <= 0) return 1;
    let power = 1;
    while (power < n) {
        power *= 2;
    }
    return power;
}

/**
 * @param {Complex[]} signal
 * @param {number} targetLength
 * @returns {Complex[]}
 */
function zeroPad(signal, targetLength) {
    const currentLength = signal.length;
    if (currentLength >= targetLength) return signal;
    const paddedSignal = [...signal];
    for (let i = currentLength; i < targetLength; i++) paddedSignal.push(new Complex(0, 0));
    return paddedSignal;
}




/**
 * @param {Complex[]} x
 * @returns {Complex[]}
 */
function fft(x) {
    const N = x.length;

    const paddedN = nextPowerOf2(N);
    const paddedX = zeroPad(x, paddedN);

    function fftRecursive(arr) {
        const currentN = arr.length;

        if (currentN <= 1) {
            return arr;
        }

        const even = [];
        const odd = [];
        for (let i = 0; i < currentN; i++) {
            if (i % 2 === 0) {
                even.push(arr[i]);
            } else {
                odd.push(arr[i]);
            }
        }
        const fftEven = fftRecursive(even);
        const fftOdd = fftRecursive(odd);

        const T = [];
        for (let k = 0; k < currentN / 2; k++) {
            const angle = -2 * Math.PI * k / currentN;
            const twiddleFactor = new Complex(Math.cos(angle), Math.sin(angle));
            T.push(twiddleFactor.multiply(fftOdd[k]));
        }

        const result = [];
        for (let k = 0; k < currentN / 2; k++) {
            result.push(fftEven[k].add(T[k]));
        }
        for (let k = 0; k < currentN / 2; k++) {
            result.push(fftEven[k].subtract(T[k]));
        }
        return result;
    }
    const fftResultRaw = fftRecursive(paddedX);

    return fftResultRaw.slice(0, N);
}

/**
 * @param {Complex[]} x
 * @returns {Complex[]}
 */
function ifft(x) {
    const N = x.length;

    const conjugatedX = x.map(c => new Complex(c.real, -c.imag));

    const fftOfConjugated = fft(conjugatedX);

    const conjugatedResult = fftOfConjugated.map(c => new Complex(c.real, -c.imag));

    const finalResult = conjugatedResult.map(c => new Complex(c.real / N, c.imag / N));

    return finalResult;
}



export { fft, ifft };