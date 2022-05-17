const asyncChain = require("./index");

class Calc {

    constructor () {
        this.stack = [];
        this.self = this;
    }

    async push (n) {
        return new Promise(resolve => { 
            setTimeout(() => {
                this.stack.push(n)
                resolve(this.stack);
            }, Math.random() * 200);
        });
    }

    async pop () {
        return new Promise(resolve => { 
            setTimeout(() => {
                console.log(this.stack);
                resolve(this.stack.shift());
            }, Math.random() * 200);
        });
    }

    async number (n) {
        await this.push(n);
        return this;
    }

    async add () {
        const a = await this.pop();
        const b = await this.pop();

        await this.push(a + b);

        console.log(this.stack);
        return this;
    }

    async mul () {
        const a = await this.pop();
        const b = await this.pop();

        await this.push(a * b);

        return this;
    }

    async div () {
        const a = await this.pop();
        const b = await this.pop();

        await this.push(a / b);

        return this;
    }

    minus () {
        const a = this.stack.shift();
        const b = this.stack.shift();

        this.stack.push(a - b);
        return this; 
    }


    get self2 () {
        return this;
    }


    get chain () {
        return asyncChain(this);
    }
}

async function fn (wait, text) {
    await new Promise(resolve => {
        setTimeout(() => {
            console.log(text);
            resolve();
        }, wait);
    });

    return fn;
}

const fn2 = wait => async text => {
    await new Promise(resolve => {
        setTimeout(() => {
            console.log(text);
            resolve();
        }, wait);
    });

    return fn2;
}


async function main () {
    const t = new Calc();

    {
        const ac = await t.chain.number(4).number(1).minus().number(2).self.mul().self2.number(3).add().pop();
        console.log("Result ", ac);
    }

    {
        const ac = await asyncChain(t).number(4).number(1).minus().number(2).self.mul().number(3).add().pop();
        console.log("Result ", ac);
    }

    await asyncChain(fn)(1000, 'hello')(0,'world')(100, "!");
    await asyncChain(fn2)(1000)('hello')(0)('world')(100)("!");
}

main();

