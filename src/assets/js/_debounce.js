export default (func, interval) => {
    let timer = null;
    return function (...arg) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            return func.apply(this, arg);
        }, interval);
    }
}