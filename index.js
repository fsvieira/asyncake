function asyncChain (obj) {
    let promise = Promise.resolve(obj);

    const proxy = new Proxy(function () {}, {
        get (target, prop, receiver) {
            if (prop === 'then') {
                return (...args) => promise.then(...args);
            }

            promise = promise.then(obj => {
                const c = obj[prop];
                if (c instanceof Function) {
                    return (...args) => c.apply(obj, args);
                }
                
                return c;
            });

            return proxy;
        },
        apply (target, thisArg, argumentsList) {

            promise = promise.then(call => {
                return call(...argumentsList);
            });

            return proxy;
        }
    });

    return proxy;
}

module.exports = asyncChain;
