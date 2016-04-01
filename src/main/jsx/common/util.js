export function isElementInViewport (el) {
    if (!el)
        return false;
    var rect = el.getBoundingClientRect();
    return (
        (rect.top >= (window.innerHeight / 5 || document.documentElement.clientHeight / 5) &&
        rect.bottom <= (window.innerHeight * 3 / 4 || document.documentElement.clientHeight * 3 / 4))
    );
}
