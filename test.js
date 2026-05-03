import { Convert , Complex } from "./fft/complex.js";
import { fft, ifft } from "./fft/fft.js";
import WavEncoder from "wav-encoder";
import fs from "fs/promises";
import crypto from "node:crypto";

function frequencyFilterKeeper(X, Fs, from, to) {
  for (let k = 0; k < X.length; k++) {
      const f = (k * Fs) / X.length;
      if (f < from || f > to) {
          X[k] = new Complex(0, 0); 
      }
  }
  return X;
}

function processLowPass(inputFloat32, Fs) {
    const convertor = new Convert();
    const N0 = inputFloat32.length;

    const xComplex = convertor.RealToComplex(inputFloat32);

    const X = fft(xComplex);

    const Xf = frequencyFilterKeeper(X, Fs, 0, 1100);
    // const Xf = lowPassFilterFFT(X, Fs, cutoffHz);

    const yComplex = ifft(Xf);

    const yFloat32 = convertor.ComplexToF32(yComplex, N0);

    return yFloat32;
    
}

function generateWhiteNoise(duration, sampleRate) {
    const whiteNoise = new Float32Array(duration * sampleRate);
    for (let i = 0; i < duration * sampleRate; i++) {
        whiteNoise[i] = crypto.randomInt(0, 10000) / 10000 * 2 - 1;
    }
    return whiteNoise;
}

const sampleRate = 44100;
const noise = processLowPass(generateWhiteNoise(3, sampleRate), sampleRate); 
console.log(noise)
WavEncoder.encode({
    bitDepth: 32,
    channelData: [noise],
    sampleRate: sampleRate,
    FloatToPCM: true
}).then(async (a) => {
    await fs.writeFile("CJ.wav", Buffer.from(a));
    console.log("File Written successfully.");
}).catch((e) => {
    console.error(e);
})


/*
function lowPassFilterFFT(X, Fs, cutoffHz) {
  const N = X.length;
  const out = X.map(c => new Complex(c.real, c.imag));
  const cutoffBin = Math.floor(cutoffHz * N / Fs);

  for (let k = cutoffBin + 1; k < N - cutoffBin; k++) {
    out[k] = new Complex(0, 0);
  }
  return out;
}
*/