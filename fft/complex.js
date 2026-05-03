// complex.js

class Complex {
    constructor(real = 0, imag = 0) {
        this.real = real;
        this.imag = imag;
    }
    add(other) {
        return new Complex(this.real + other.real, this.imag + other.imag);
    }

    subtract(other) {
        return new Complex(this.real - other.real, this.imag - other.imag);
    }

    multiply(other) {
        // (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
        const realPart = this.real * other.real - this.imag * other.imag;
        const imagPart = this.real * other.imag + this.imag * other.real;
        return new Complex(realPart, imagPart);
    }

    magnitude() {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }

    phase() {
        return Math.atan2(this.imag, this.real);
    }

    toString(precision = 4) {
        const r = this.real.toFixed(precision);
        const i = this.imag.toFixed(precision);
        if (Math.abs(this.imag) < 1e-9) {
            return `${r}`;
        }
        if (Math.abs(this.real) < 1e-9) {
            return `${i}i`;
        }
        return `${r} + ${i}i`;
    }

}

class Convert {
    RealToComplex(real) {
        const out = new Array(real.length);
        for (let i = 0; i < real.length; i++) {
            out[i] = new Complex(real[i], 0);
        }
        return out;
    }
    ComplexToF32(complex) {
        const out = new Float32Array(complex.length);
        for (let i = 0; i < complex.length; i++) {
            out[i] = complex[i].real;
        }
    }
    ComplexToF16(complex) {
        const out = new Float16Array(complex.length);
        for (let i = 0; i < complex.length; i++) {
            out[i] = complex[i].real;
        }
    }
    ComplexToF64(complex) {
        const out = new Float64Array(complex.length);
        for (let i = 0; i < complex.length; i++) {
            out[i] = complex[i].real;
        }
    }
}

export { Complex, Convert};