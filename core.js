import fs from "fs/promises";
import crypto from "crypto";
import WavEncoder from "wav-encoder";

const sampleRate = 44100;
const duration = 6; // second
const VSignals = sampleRate * duration;

function generateWhiteNoise(duration, sampleRate) {
    const whiteNoise = new Float32Array(duration * sampleRate);
    for (let i = 0; i < duration * sampleRate; i++) {
        whiteNoise[i] = crypto.randomInt(0, 10000) / 10000 * 2 - 1;
    }
    return whiteNoise;
}

function d2r(d) {
    return d * (Math.PI / 180);
}
function r2d(d) {
    return d * (180 / Math.PI);
}









/*
const whiteNoise = generateWhiteNoise(duration, sampleRate);
const data = setAmplitude(whiteNoise, sampleRate, intensityHzPerSec(whiteNoise, sampleRate));
console.log(data);
WavEncoder.encode({
    bitDepth: 32,
    channelData: [data],
    sampleRate: sampleRate,
    FloatToPCM: true
}).then(async (a) => {
    await fs.writeFile("output.wav", Buffer.from(a));
    console.log("File Written successfully.");
}).catch((e) => {
    console.error(e);
})
*/