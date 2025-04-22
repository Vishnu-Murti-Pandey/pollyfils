
// Here's a simple implementation of a memoized function in JavaScript that caches outputs based on input arguments:

function memoize(func) {
    const memoObj = {};
    return function (...args) {
        const key = JSON.stringify(args);
        if (memoObj[key]) {
            console.log('Fetching from cache for:', key);
            return memoObj[key];
        }
        console.log('Calculating result for:', key);
        const result = func(...args);
        memoObj[key] = result;
        return result;
    }
}

function slowAdd(a, b) {
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
       sum = sum + a+ b;
    }
    return sum;
}

const memoizedAdd = memoize(slowAdd);

console.log(memoizedAdd(3, 4)); // Calculates and caches
console.log(memoizedAdd(3, 4)); // Fetches from cache
console.log(memoizedAdd(5, 6)); // New calculation
