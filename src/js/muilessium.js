import * as Utils from './utils';

import { Input    as inputComponent    } from './components/input';
import { Button   as buttonComponent   } from './components/button';
import { Textarea as textareaComponent } from './components/textarea';
import { Like     as likeComponent     } from './components/like';
import { Carousel as carouselComponent } from './components/carousel';


class Muilessium {
    constructor(options) {
        if (typeof Muilessium.instance === 'object') {
            return Muilessium.instance;
        }
        
        this.options = Object.assign(Muilessium.defaults, options);
        
        Utils.normalizeTabIndex();
        Utils.objectFitImages();
        
        Muilessium.instance = this;
        
        return this;
    }

    create(type, selector, options) {
        if (typeof Muilessium.components[type] !== 'function') {
            throw new Error('No such component: ' + type);
        }
        
        var components = document.querySelectorAll(selector);
        
        return [].forEach.call(components, function(element) {
            new Muilessium.components[type](element, options);
        });
    };
}


Muilessium.components = {
    input:    inputComponent,
    textarea: textareaComponent,
    like:     likeComponent,
    button:   buttonComponent,
    carousel: carouselComponent
};


Muilessium.defaults = {};

export default Muilessium;
