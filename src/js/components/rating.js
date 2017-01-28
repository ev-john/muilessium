import * as Keyboard from '../controls/keyboard';

import { aria                       } from '../utils/aria';
import { getAttribute, setAttribute } from '../utils/attributes';
import { addClass, removeClass      } from '../utils/classes';
import { console                    } from '../utils/console';
import { makeElementFocusable, makeChildElementsClickable } from '../utils/focus-and-click';
import { extend, forEach            } from '../utils/uncategorized';

import { Component } from '../component';


export class Rating extends Component {
    constructor(element, options) {
        super(element, options);

        this.dom = extend(this.dom, {
            stars: element.querySelectorAll('.star')
        });

        this.state = extend(this.state, {
            rating: parseInt(getAttribute(element, 'data-rating'), 10),
            maxRating: 5,
            minRating: 0
        });

        this.initAria();
        this.initControls();
        this.updateRating(this.state.rating);
    }


    initAria() {
        forEach(this.dom.stars, (star) => {
            aria.set(star, 'hidden', true);
        });

        return this;
    }


    initControls() {
        makeElementFocusable(this.element);

        Keyboard.onArrowLeftPressed(this.element,  this.decreaseRating.bind(this));
        Keyboard.onArrowRightPressed(this.element, this.increaseRating.bind(this));

        makeChildElementsClickable(this.element, this.dom.stars, (index) => {
            this.updateRating(index + 1);
        }, true);

        return this;
    }


    updateRating(newRating) {
        if (newRating < this.state.minRating || newRating > this.state.maxRating) {
            console.error('wrong rating value');
            return this;
        }

        removeClass(this.element, '-r' + this.state.rating);
        addClass(this.element, '-r' + newRating);

        let newAriaLabel = aria.get(this.element, 'label').replace(this.state.rating, newRating);

        aria.set(this.element, 'label', newAriaLabel);
        setAttribute(this.element, 'data-rating', newRating);

        this.state.rating = newRating;

        if (this.element === document.activeElement) {
            this.element.blur();
            this.element.focus();
        }

        return this;
    }


    increaseRating() {
        if (this.state.rating < this.state.maxRating) {
            this.updateRating(this.state.rating + 1);
        }

        return this;
    }


    decreaseRating() {
        if (this.state.rating > this.state.minRating) {
            this.updateRating(this.state.rating - 1);
        }

        return this;
    }
};

