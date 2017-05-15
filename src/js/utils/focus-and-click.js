// -----------------------------------------------------------------------------
// FOCUS AND CLICK
// -----------------------------------------------------------------------------
// This is a number of function for manipulating with 'focus' and 'click' events
// in accessible components.
// 
// Here is the full list of 'focus&click' utilities:
//  - makeElementFocusable(element)
//  - makeElementsFocusable(elementsList)
//  - makeElementNotFocusable(element)
//  - makeElementsNotFocusable(elementsList)
//  - getFocusableChilds(element)
//  - getAllFocusableElements()
//  - getNextFocusableElement(element)
//  - getPreviousFocusableElement(element)
//  - goToNextFocusableElement(element)
//  - GoToPreviousFocusableElement(element)
//  - makeElementClickable(element, callback, { mouse = true, keyboard = true } = {})
//  - makeChildElementsClickable(element, childs, callback, { mouse = true, keyboard = true } = {})
//  - onFocus(element, callback)
//  - onBlur(element, callback)


import * as Mouse from '../controls/mouse';
import * as Keyboard from '../controls/keyboard';

import { ifExists       } from '../utils/checks';
import { ifNodeList     } from '../utils/checks';
import { isDescendant   } from '../utils/checks';
import { forEach        } from '../utils/uncategorized';


// Make element focusable
// ----------------------
// Sets tabindex=0 to the element if it exists

export function makeElementFocusable(element) {
    return ifExists(element, () => {
        element.tabIndex = 0;
    });
};



// Make multiple elements focusable
// --------------------------------
// Sets tabindex=0 to the multiple elements in NodeList

export function makeElementsFocusable(elements) {
    return ifNodeList(elements, () => {
        forEach(elements, (element) => {
            makeElementFocusable(element);
        });
    });
};



// Make element not focusable
// --------------------------
// Sets tabindex=-1 to the element

export function makeElementNotFocusable(element) {
    return ifExists(element, () => {
        element.tabIndex = -1;
    });
};



// Make multiple elements not focusable
// ------------------------------------
// Sets tabindex=-1 to the multiple elements in NodeList

export function makeElementsNotFocusable(elements) {
    return ifNodeList(elements, () => {
        forEach(elements, (element) => {
            makeElementNotFocusable(element);
        });
    });
};



// Get focusable childs
// --------------------
// Returns NodeList of childs of selected element with tabindex >= 0

export function getFocusableChilds(element) {
    return ifExists(element, () => {
        return element.querySelectorAll('[tabindex]:not([tabindex="-1"])');
    });
};



// Get all focusable elements
// --------------------------
// Returns NodeList with all elements with tabindex >= 0

export function getAllFocusableElements() {
    return document.querySelectorAll('[tabindex]:not([tabindex="-1"])');
};


// Get next focusable element
// --------------------------
// Returns next element with tabindex >= 0

export function getNextFocusableElement(element) {
    return ifExists(element, () => {
        let focusables = getAllFocusableElements(),
            currentIndex = [].indexOf.call(focusables, element);

        if ((currentIndex >= 0) && (currentIndex < focusables.length - 1)) {
            return focusables[currentIndex + 1];
        } else {
            return null;
        }
    });
};


// Get previous focusable element
// --------------------------
// Returns previous element with tabindex >= 0

export function getPreviousFocusableElement(element) {
    return ifExists(element, () => {
        let focusables = getAllFocusableElements(),
            currentIndex = [].indexOf.call(focusables, element);

        if ((currentIndex >= 0) && (currentIndex > 0)) {
            return focusables[currentIndex - 1];
        } else {
            return null;
        }
    });
};



// Go to next focusable
// --------------------
// Focus next focusable element

export function goToNextFocusableElement(element) {
    let nextFocusable = getNextFocusableElement(element);

    return ifExists(nextFocusable, () => {
        nextFocusable.focus();

        return nextFocusable;
    });
};



// Go to previous focusable
// --------------------
// Focus previous focusable element

export function goToPreviousFocusableElement(element) {
    let previousFocusable = getPreviousFocusableElement(element);

    return ifExists(previousFocusable, () => {
        previousFocusable.focus();

        return previousFocusable;
    });
};



// Make element clickable
// ----------------------
// Sets tabindex=0 to the element and adds event listeners for the click and
// enter key press with callback to the element if it exists

export function makeElementClickable(element, callback, { mouse = true, keyboard = true } = {}) {
    return ifExists(element, () => {
        if (mouse) {
            Mouse.onClick(element, (e) => {
                callback(e);
            });
        }

        if (keyboard) {
            element.tabIndex = 0;

            Keyboard.onEnterPressed(element, (e) => {
                callback(e);
            });
        }
    });
};



// Make childs clickable
// ----------------------
// Sets tabindex=0 to the child elements of the selected element
// and adds event listeners for the click and enter key press
// with callback to the childs if they exists

export function makeChildElementsClickable(element, childs, callback, { mouse = true, keyboard = true } = {}) {
    return ifExists(element, () => {
        return ifNodeList(childs, () => {
            if (mouse) {
                Mouse.onClick(element, (e) => {
                    let index = -1;

                    forEach(childs, (child, i) => {
                        if ((child == e.target) || isDescendant(child, e.target)) {
                            index = i;
                        }
                    });

                    if (index >= 0) {
                        callback(index);
                    }
                });
            }

            if (keyboard) {
                forEach(childs, (child) => {
                    child.tabIndex = 0;
                });

                Keyboard.onEnterPressed(element, (e) => {
                    let index = [].indexOf.call(childs, e.target);

                    if (index >= 0) {
                        callback(index);
                    }
                });
            }
        });
    });
};


// On focus
// --------
// Execues callback when selected element being focused

export function onFocus(element, callback) {
    return ifExists(element, () => {
        element.addEventListener('focus', callback);
    });
};


// On blur
// -------
// Execues callback when selected element being unfocused

export function onBlur(element, callback) {
    return ifExists(element, () => {
        element.addEventListener('blur', callback);
    });
};


