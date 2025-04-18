
// infinite hunction currying
function sum(a) {
    return function (b) {
        if (b) {
            return sum(a + b);
        }
        return a;
    }
}

const ans = sum(1)(2)(3)(4)(5);
console.log(ans());

// infinite args currying

function sum2(...args) {
    let a = args.reduce((a, b) => a + b, 0)
    return function (...args) {
        let b = args.reduce((a, b) => a + b, 0)
        if (b) {
            return sum2(a + b)
        }
        return a
    }
}

const res = sum2(1, 2, 3)(2)(3, 4, 6)(4, 9, 8)(5, 2, 1, 4);
console.log(res());
