# Asyncake
Async Chains like a boss, piece of cake.

# Install

```
  npm install asyncake --save
```

# How to use 

There is only one function, here we call it asyncChain,
call the function with the object or function that you want to chain 
and thats it. 

```
const asyncChain = require('asyncake');

async function main () {
    const t = new Calc();

    const ac = await asyncChain(t).number(4).number(1).minus().number(2).self.mul().number(3).add().pop();
    console.log("Result ", ac);
}

```

In this exmple number, minus, self, ... are chainanble but they are async so without asyncChain we would have to do something like 
this: 

```
(await ... (await (await (await t.number(4)).number(1)).minus())...);
```

Async Cake solves the problem and make async chains a piece of cake to work with.

Note: asyncake also supports the catch and finally methods.

You can check the full example here https://github.com/fsvieira/asyncake/blob/main/test.js


