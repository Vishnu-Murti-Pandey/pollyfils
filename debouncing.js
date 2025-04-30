function handleResize() {
    console.log('Resize event at', new Date().toLocaleTimeString());
}

const debouncedResize = debounce(handleResize, 800);

window.addEventListener('resize', debouncedResize);

function debounce(func, wait) {
    let timeout;

    return function (...args) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
}