function throttle(fn, delay) {
    let lastTime = 0;
    return function (...args) {
        let now = Date.now();
        if (now - lastTime >= delay) {
            fn(...args)
            lastTime = now;
        }
    };
}

window.addEventListener('mouseup', throttle(() => {
    console.log('Scroll event triggered!');
}, 1000));