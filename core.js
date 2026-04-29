import fs from "fs/promises";
import crypto from "crypto";
import WavEncoder from "wav-encoder";

const sampleRate = 44100;
const duration = 5; // second
const VSignals = sampleRate * duration;

function generateWhiteNoise(Volume) {
    const whiteNoise = new Float32Array(Volume);
    for (let i = 0; i < Volume; i++) {
        whiteNoise[i] = crypto.randomInt(0, 10000) / 10000 * 2 - 1;
    }
    return whiteNoise;
}





const data = new Float32Array(VSignals);

WavEncoder.encode({
    bitDepth: 32,
    channelData: [data],
    sampleRate: sampleRate,
    FloatToPCM: true
})