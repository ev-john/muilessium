// -----------------------------------------------------------------------------
// ACCORDION COMPONENT
// -----------------------------------------------------------------------------
// Methods list:
//  - (default) initAria()
//  - (default) initControls()
//  - foldItem(index)
//  - foldAllItems()
//  - unfoldItem(index)
//  - unfoldAllItems()
//  - toggleItem()


import { Component } from '../component';

import * as Keyboard from '../controls/keyboard';

import { aria                       } from '../utils/aria';
import { setAttribute               } from '../utils/attributes';
import { addClass                   } from '../utils/classes';
import { removeClass                } from '../utils/classes';
import { toggleClass                } from '../utils/classes';
import { makeChildElementsClickable } from '../utils/focus-and-click';
import { extend                     } from '../utils/uncategorized';
import { forEach                    } from '../utils/uncategorized';
import { firstOfList                } from '../utils/uncategorized';
import { lastOfList                 } from '../utils/uncategorized';



export class Accordion extends Component {
    constructor(element, options) {
        super(element, options);

        this.domCache = extend(this.domCache, {
            items:      element.querySelectorAll('.item'),
            titles:     element.querySelectorAll('.title'),
            indicators: element.querySelectorAll('.indicator'),
            contents:   element.querySelectorAll('.content')
        });

        this.initAria();
        this.initControls();
    }


    initAria() {
        aria.setRole(this.domCache.element, 'tablist');
        setAttribute(this.domCache.element, 'multiselectable', true);
        
        forEach(this.domCache.titles, (title, index) => {
            aria.setRole(title, 'tab');
            aria.set(title, 'expanded', false);
            aria.set(title, 'controls', aria.setId(this.domCache.contents[index]));
        });

        forEach(this.domCache.contents, (content, index) => {
            aria.setRole(content, 'tabpanel');
            aria.set(content, 'hidden', true);
            aria.set(content, 'labelledby', aria.setId(this.domCache.titles[index]));
        });

        forEach(this.domCache.indicators, (indicator) => {
            aria.set(indicator, 'hidden', true);
        });

        return this;
    }


    initControls() {
        makeChildElementsClickable(this.domCache.element, this.domCache.titles, (index) => {
            this.toggleItem(index);
        });

        forEach(this.domCache.titles, (title, index) => {
            Keyboard.onSpacePressed(title, this.toggleItem.bind(this, index));

            if (title != firstOfList(this.domCache.titles)) {
                Keyboard.onArrowUpPressed(title, () => {
                    this.domCache.titles[index-1].focus(); 
                });
            }
            
            if (title != lastOfList(this.domCache.titles)) {
                Keyboard.onArrowDownPressed(title, () => {
                    this.domCache.titles[index+1].focus(); 
                });
            }
        });

        return this;
    }


    foldItem(index) {
        removeClass(this.domCache.items[index], '-unfold');

        aria.set(this.domCache.titles[index],   'expanded', false);
        aria.set(this.domCache.contents[index], 'hidden',   true);

        return this;
    }


    foldAllItems() {
        forEach(this.domCache.items, (item, index) => {
            this.foldItem(index);
        });

        return this;
    }


    unfoldItem(index) {
        addClass(this.domCache.items[index], '-unfold');

        aria.set(this.domCache.titles[index],   'expanded', true);
        aria.set(this.domCache.contents[index], 'hidden',   false);

        return this;
    }


    unfoldAllItems() {
        forEach(this.domCache.items, (item, index) => {
            this.unfoldItem(index);
        });

        return this;
    }


    toggleItem(index) {
        toggleClass(this.domCache.items[index], '-unfold');

        aria.toggleState(this.domCache.titles[index],   'expanded');
        aria.toggleState(this.domCache.contents[index], 'hidden');

        return this;
    }
};

