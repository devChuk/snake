/**
 * The utils script contains functions for manipulating the DOM as well as a debouncing function and
 * a random number generator.
 */
'use strict';


function el(id) {
    return document.getElementById(id);
}

function hideMenu() {
    el('button').disabled = true;
    let menu = el('menu-screen');
    menu.classList.remove('visible');
    menu.classList.add('hidden');
}

function notifyPlayer(win = false) {
    el('title').innerText = win ? 'You win.' : 'Bad Luck.';
    el('title').style.color = win ? 'black' : 'white';
}

function showMenu() {
    document.getElementsByClassName('info')[0].innerText = 'Want to play again?';
    el('button').disabled = false;
    let menu = el('menu-screen');
    menu.classList.remove('hidden');
    menu.classList.add('visible');
}

function debounce(func, delay) {
    /**
     * Returns a function, that, as long as it is invoked, will not be triggered until
     * N milliseconds later
     * @param {function} func The function to debounce
     * @param {number} delay The time (N) to wait, in milisseconds
     * @return {function} The debounced function
     */
    let inDebounce;
    return function() {
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func(), delay);
    };
}

function getRandomArbitrary(min, max) {
    /**
     * @param {number} min inclusive
     * @param {number} max exclusive
     * @return {number} A random integer between the specified values
     */
    return Math.floor(Math.random() * (max - min) + min);
}
