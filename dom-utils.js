/**
 * The dum-utils script does magic.
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

function showMenu() {
    el('button').disabled = false;
    let menu = el('menu-screen');
    menu.classList.remove('hidden');
    menu.classList.add('visible');
}
