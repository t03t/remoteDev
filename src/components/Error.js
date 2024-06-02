import {
    DEFAULT_DISPLAY_TIMEOUT,
    errorEl,
    errorTextEl
 } from "../common.js";

const renderError = (message = 'An error has occured') => {
    errorTextEl.textContent = message;
    errorEl.classList.add('error--visible');
    setTimeout(() => {
        errorEl.classList.remove('error--visible');
    }, DEFAULT_DISPLAY_TIMEOUT);
};

export default renderError;