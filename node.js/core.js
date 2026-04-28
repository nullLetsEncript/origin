import fs from "fs/promises";
import crypto from "crypto";

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048
});


class manager {
    constructor() {
        this.file = null;
        this.info = new Map();
    }
    async readFile(path) {
        try {
            this.file = this.info.get(path);
        } catch (e) {
            try {
                this.file = await fs.readFile(path);
                this.info.set(path, this.file);
                return {
                    ok: 200,
                    code: 1,
                    file: typeof this.file === "string" ? this.file.toString() : this.file
                };
            } catch (e) {
                return {
                    ok: 0,
                    code: 1,
                    m: e
                };
            }
        }
        
    }
    async writeFile(path, data) {
        try {
            await fs.writeFile(path, data);
            this.info.set(path, data);
            return {
                ok: 200,
                code: 2
            };
        } catch (e) {
            return {
                ok: 0,
                code: 2,
                m: e
            };
        }
    }
    async delFile(path) {
        try {
            await fs.unlink(path);
            this.info.delete(path);
            return {
                ok: 200,
                code: 3
            };
        } catch (e) {
            return {
                ok: 0,
                code: 3,
                m: e
            };
        }
    }
}

const manage = new manager();
manage.writeFile("new.txt", "Hey there!");